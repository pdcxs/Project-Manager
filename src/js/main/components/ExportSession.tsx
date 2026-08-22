import { useState } from "react";
import { Button, Group, Tooltip, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { evalTS } from "../../lib/utils/bolt";
import { child_process, path, fs } from "../../lib/cep/node";
import { zipDirectory } from "../../lib/utils/zip";

const exportFolderName = "工程管理助手";

export default function ExportSession() {
    const [loading, setLoading] = useState(false);

    const isWin = typeof process !== "undefined" && process.platform === "win32";

    const getExportSessionFolder = async () => {
        const docPath = await evalTS("getActiveDocPath");
        const p = path.dirname(docPath);
        const exptPath = path.join(p, exportFolderName);
        const name = await evalTS("getActiveDocName");
        const r = path.join(exptPath, name);
        if (fs.existsSync(r))
            return r;
        return "";
    }

    const openExportFolder = async () => {
        try {
            const docPath = await evalTS("getActiveDocPath");
            const p = path.dirname(docPath);
            const exptPath = path.join(p, exportFolderName);
            if (!fs.existsSync(exptPath)) {
                modals.openContextModal({
                    modal: "alertModal",
                    title: "会话未导出",
                    innerProps: {
                        message: "当前多轨会话未导出，请先导出后再打开",
                        type: "error",
                    },
                });
                return;
            }
            if (child_process.exec) {
                if (isWin) {
                    child_process.exec(`explorer "${exptPath}"`);
                } else {
                    child_process.exec(`open "${exptPath}"`);
                }
            }
        } catch (err) {
            console.error("Error: ", err);
        }
    }

    const handleExport = async () => {
        setLoading(true);
        try {
            const result = await evalTS("exportCurrentSession", exportFolderName);

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

                // 4. 规范化系统路径分隔符
                const normalizedPath = isWin
                    ? exportFolderPath.replace(/\//g, "\\")
                    : exportFolderPath.replace(/\\/g, "/");

                modals.openContextModal({
                    modal: "alertModal",
                    title: "导出会话成功",
                    innerProps: {
                        message: `会话及音频素材已成功导出并转码为 MP3！\n保存路径：${normalizedPath}`,
                        type: "success",
                        buttonText: "太棒了",
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

    const handleZip = () => {
        modals.openConfirmModal({
            title: "会话打包确认",
            children: (
                <Text c="red" style={{ "fontWeight": "bold" }}>
                    请在会话完全导出后，再打包会话。如果还未导出或者正在导出中，请不要打包。
                </Text>
            ),
            labels: { confirm: "我确认会话已经完全导出，开始打包", cancel: "稍后再试" },
            onConfirm: async () => {
                const sp = await getExportSessionFolder();
                if (sp === "") {
                    modals.openContextModal({
                        modal: "alertModal",
                        title: "会话未导出",
                        innerProps: {
                            message: "当前多轨会话未导出，请先导出后再压缩",
                            type: "error",
                        },
                    });
                    return;
                }
                setLoading(true);
                await zipDirectory(sp, `${sp}.zip`);
                await openExportFolder();
                setLoading(false);
            }
        })
    }

    return (
        <Group justify="center" align="top" wrap="nowrap" gap="sm">
            <Button onClick={handleExport} loading={loading}>
                导出会话
            </Button>
            <Button onClick={openExportFolder} loading={loading}>
                打开目录
            </Button>
            <Tooltip label="请在导出完成后再压缩">
                <Button onClick={handleZip} loading={loading}>
                    打包会话
                </Button>
            </Tooltip>
        </Group>
    );
}