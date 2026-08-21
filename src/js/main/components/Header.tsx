import { useLocalStorage } from "@mantine/hooks";
import { Group, ActionIcon, Text, Tooltip, Paper } from "@mantine/core";
import { IconSettings, IconFolderOpen } from "@tabler/icons-react";
import ThemeSwither from "./ThemeSwither"; // 替换为你实际的 ThemeSwither 路径
import { child_process, fs } from "../../lib/cep/node"; // 请按你项目实际相对路径调整

export default function Header() {
    const [workspacePath, setWorkspacePath] = useLocalStorage<string>({
        key: "au-cep-workspace-path",
        defaultValue: "",
    });

    const handleSelectWorkspace = () => {
        const result = window.cep.fs.showOpenDialog(
            false,
            true,
            "选择新建会话路径",
            workspacePath || "",
            null
        );

        if (result.err === 0 && result.data && result.data.length > 0) {
            let rawPath = result.data[0];
            if (rawPath.startsWith("file://")) {
                rawPath = rawPath.replace(/^file:\/\/(localhost)?/, "");
            }

            // 2. 将 %xx 格式的 URL 编码还原为正常的中文/特殊字符
            rawPath = decodeURIComponent(rawPath);

            // 3. (可选) Windows 平台兼容处理：去除开头多余的正斜杠（如 /C:/Users/... -> C:/Users/...）
            if (navigator.platform.toUpperCase().indexOf('WIN') > -1) {
                rawPath = rawPath.replace(/^\/([a-zA-Z]:)/, '$1');
            }
            setWorkspacePath(rawPath);
        }
    };

    const handleOpenWorkspaceInExplorer = () => {
        if (!workspacePath) {
            alert("新建会话路径不存在，请重新设置！");
            return;
        }

        if (fs.existsSync && !fs.existsSync(workspacePath)) {
            alert("新建会话路径不存在，请重新设置！");
            return;
        }

        try {
            if (child_process.exec) {
                const isWin = typeof process !== "undefined" && process.platform === "win32";

                if (isWin) {
                    const winPath = workspacePath.replace(/\//g, "\\");
                    child_process.exec(`explorer "${winPath}"`);
                } else {
                    child_process.exec(`open "${workspacePath}"`);
                }
            }
        } catch (err) {
            console.error("打开文件夹失败:", err);
        }
    };

    return (
        <Paper p="xs" radius={0} withBorder style={{ borderTop: 0, borderLeft: 0, borderRight: 0 }}>
            <Group justify="space-between" align="center" wrap="nowrap" gap="sm">

                {/* 左侧：齿轮 - 设置工作区目录 */}
                <Tooltip label="设置新建会话路径" position="bottom" withArrow>
                    <ActionIcon
                        variant={workspacePath ? "light" : "filled"}
                        color={workspacePath ? "blue" : "red"}
                        size="lg"
                        onClick={handleSelectWorkspace}
                        aria-label="设置新建会话路径"
                    >
                        <IconSettings size={20} stroke={1.8} />
                    </ActionIcon>
                </Tooltip>

                {/* 中间：路径展示（未设置显示红色警告，超长自动从左截断保留尾部） */}
                <Tooltip
                    label={workspacePath || "请点击齿轮选择新建路径"}
                    position="bottom"
                    withArrow
                >
                    <Text
                        size={workspacePath ? "xs" : "lg"}
                        fw={workspacePath ? 400 : 600}
                        c={workspacePath ? "dimmed" : "red.6"}
                        style={{
                            flex: 1,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            direction: "rtl",      // 排版从右往左，超长截断左侧，保留右侧尾部路径
                            textAlign: "left",     // 保持文字依靠左对齐
                        }}
                    >
                        {workspacePath
                            ? `\u200E${workspacePath}`
                            : "请设置新建会话路径..."}
                    </Text>
                </Tooltip>

                {/* 右侧 1：打开文件夹图标按钮 */}
                <Tooltip label={workspacePath ? "在文件资源管理器中打开" : "请先设置新建会话路径"} position="bottom" withArrow>
                    <ActionIcon
                        variant="subtle"
                        color="gray"
                        size="lg"
                        disabled={!workspacePath} // 未设置工作区目录时禁用
                        onClick={handleOpenWorkspaceInExplorer}
                        aria-label="打开新建会话路径"
                    >
                        <IconFolderOpen size={20} stroke={1.8} />
                    </ActionIcon>
                </Tooltip>

                {/* 右侧 2：明暗主题切换组件 */}
                <ThemeSwither />

            </Group>
        </Paper>
    );
}