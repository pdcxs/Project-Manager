import { ContextModalProps } from "@mantine/modals";
import { Text, Button, Stack, Group } from "@mantine/core";
import { IconAlertCircle, IconCheck, IconInfoCircle } from "@tabler/icons-react";

interface AlertModalInnerProps {
    message: string | React.ReactNode;
    type?: "error" | "success" | "info";
    buttonText?: string;
}

export default function AlertModal({
    context,
    id,
    innerProps,
}: ContextModalProps<AlertModalInnerProps>) {
    const { message, type = "error", buttonText = "我知道了" } = innerProps;

    // 根据类型显示不同颜色和图标
    const renderIcon = () => {
        switch (type) {
            case "error":
                return <IconAlertCircle size={28} style={{ color: "var(--mantine-color-red-6)", flexShrink: 0 }} />;
            case "success":
                return <IconCheck size={28} style={{ color: "var(--mantine-color-green-6)", flexShrink: 0 }} />;
            default:
                return <IconInfoCircle size={28} style={{ color: "var(--mantine-color-blue-6)", flexShrink: 0 }} />;
        }
    };

    return (
        <Stack gap="md">
            <Group gap="xs" wrap="nowrap" align="flex-start">
                {renderIcon()}
                <Text size="sm" style={{ flex: 1 }}>
                    {message}
                </Text>
            </Group>

            <Button
                fullWidth
                color={type === "error" ? "red" : type === "success" ? "green" : "blue"}
                onClick={() => context.closeModal(id)}
            >
                {buttonText}
            </Button>
        </Stack>
    );
}