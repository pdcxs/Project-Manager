import { useState } from "react";
import { Button, Center } from "@mantine/core";
import { modals } from "@mantine/modals";
import { evalTS } from "../../lib/utils/bolt";
import { child_process } from "../../lib/cep/node";
import { zipDirectory } from "../../lib/utils/zip";

export default function ExportSession() {
    const [loading, setLoading] = useState(false);

    const handleExport = async () => {
        setLoading(true);
        try {
            const result = await evalTS("exportCurrentSession");

            if (result.startsWith("Error: NoActive")) {
                modals.openContextModal({
                    modal: "alertModal",
                    title: "无法导出会话",
                    innerProps: {
                        message: "当前没有打开的多轨会话，请先打开或创建会话。",
                        type: "error",
                    },
                });
                return;
            }

            // 2. 当前工程尚未保存
            if (result.startsWith("Error: NoSave")) {
                modals.openContextModal({
                    modal: "alertModal",
                    title: "会话未保存",
                    innerProps: {
                        message: "当前多轨会话未保存，请先保存工程（Ctrl+S）后再重试。",
                        type: "error",
                    },
                });
                return;
            }

            // 3. 其他 ExtendScript 执行或导出异常
            if (result.startsWith("Error")) {
                modals.openContextModal({
                    modal: "alertModal",
                    title: "导出失败",
                    innerProps: {
                        message: `导出会话时遇到错误：${result.replace("Error:", "").trim()}`,
                        type: "error",
                    },
                });
                return;
            }

            // 4. 导出成功：解析导出的 .sesx 路径并打开 Export 文件夹
            if (result.startsWith("Success: ")) {
                const exportedSesxPath = result.replace("Success: ", "").trim();

                // 1. 统一转为标准斜杠方便分割
                const standardizedPath = exportedSesxPath.replace(/\\/g, "/");

                // 2. 按斜杠分割路径层级
                const pathParts = standardizedPath.split("/");

                // 3. 截掉文件名和项目子目录，拿到 Export 根目录路径
                // 假设结构为: .../Export/会话名称/会话名称.sesx
                // sessionFolder -> .../Export/会话名称
                // exportFolderPath -> .../Export
                let exportFolderPath = standardizedPath;
                let sessionFolder = standardizedPath;
                if (pathParts.length >= 3) {
                    sessionFolder = pathParts.slice(0, pathParts.length - 1).join("/");
                    exportFolderPath = pathParts.slice(0, pathParts.length - 2).join("/");
                } else if (pathParts.length >= 2) {
                    sessionFolder = pathParts.slice(0, pathParts.length - 1).join("/");
                    exportFolderPath = sessionFolder;
                }
                const zipOutputPath = `${sessionFolder}.zip`;

                const isWin = typeof process !== "undefined" && process.platform === "win32";

                // 4. 规范化系统路径分隔符
                const normalizedPath = isWin
                    ? exportFolderPath.replace(/\//g, "\\")
                    : exportFolderPath.replace(/\\/g, "/");

                const zipAndOpenExportFolder = async () => {
                    try {
                        if (child_process.exec) {
                            if (isWin) {
                                child_process.exec(`explorer "${normalizedPath}"`);
                            } else {
                                child_process.exec(`open "${normalizedPath}"`);
                            }
                        }
                        await zipDirectory(sessionFolder, zipOutputPath);
                    } catch (err) {
                        console.error("打开文件夹或者压缩失败:", err);
                    }
                }

                modals.openContextModal({
                    modal: "alertModal",
                    title: "导出会话成功",
                    innerProps: {
                        message: `会话及音频素材已成功导出并转码为 MP3！\n保存路径：${normalizedPath}\n请在导出完成后点击下方按钮`,
                        type: "success",
                        buttonText: "压缩并打开目录",
                        onConfirm: zipAndOpenExportFolder,
                    },
                });
            }
        } catch (err) {
            modals.openContextModal({
                modal: "alertModal",
                title: "插件异常",
                innerProps: {
                    message: `与 Audition 通信时发生未知错误：${err}`,
                    type: "error",
                },
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Center>
            <Button onClick={handleExport} loading={loading}>
                导出会话
            </Button>
        </Center>
    );
}