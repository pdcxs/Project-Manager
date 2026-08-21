import { Button, Center } from "@mantine/core"
import { evalTS } from "../../lib/utils/bolt";

export default function ExportSession() {
    const handleExport = async () => {
        const result = await evalTS("exportCurrentSession");
        alert(result);
    }
    return <Center><Button onClick={handleExport}>导出会话</Button></Center>
}