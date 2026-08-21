import { ContextModalProps } from "@mantine/modals";
import { Text, Button, Stack, Group } from "@mantine/core";
import { IconAlertCircle, IconCheck, IconInfoCircle } from "@tabler/icons-react";

interface AlertModalInnerProps {
    message: string | React.ReactNode;
    type?: "error" | "success" | "info";
    buttonText?: string;
    onConfirm?: () => void;
}
export default function AlertModal({
    context,
    id,
    innerProps,
}: ContextModalProps<AlertModalInnerProps>) {
    const { message, type = "error", buttonText = "我知道了", onConfirm } = innerProps;

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

    const handleButtonClick = () => {
        context.closeModal(id);
        if (onConfirm) {
            onConfirm();
        }
    };

    return (
        <Stack gap="md">
            <Group gap="xs" wrap="nowrap" align="flex-start">
                {renderIcon()}
                <Text size="sm" style={{ flex: 1, whiteSpace: "pre-line" }}>
                    {message}
                </Text>
            </Group>

            <Button
                fullWidth
                color={type === "error" ? "red" : type === "success" ? "green" : "blue"}
                onClick={handleButtonClick}
            >
                {buttonText}
            </Button>
        </Stack>
    );
}