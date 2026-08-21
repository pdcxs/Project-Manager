import { child_process } from "../cep/node";

/**
 * 将指定文件夹压缩为 zip 文件（保留顶级目录）
 */
export function zipDirectory(sourceDir: string, outPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const cp = child_process;
        if (!cp) {
            return reject(new Error("无法获取 Node.js child_process 环境"));
        }

        const isWin = typeof process !== "undefined" && process.platform === "win32";

        const srcPath = isWin ? sourceDir.replace(/\//g, "\\") : sourceDir.replace(/\\/g, "/");
        const destPath = isWin ? outPath.replace(/\//g, "\\") : outPath.replace(/\\/g, "/");

        let command = "";
        let options = {};

        if (isWin) {
            // 使用 PowerShell 的 .NET ZipFile 方法，完美支持带空格路径与保留顶级目录 (includeBaseDirectory = $true)
            const psScript = `
                $ErrorActionPreference = 'Stop';
                Add-Type -AssemblyName System.IO.Compression.FileSystem;
                if (Test-Path -LiteralPath '${destPath}') { Remove-Item -LiteralPath '${destPath}' -Force };
                [System.IO.Compression.ZipFile]::CreateFromDirectory('${srcPath}', '${destPath}', [System.IO.Compression.CompressionLevel]::Optimal, $true);
            `.replace(/\n\s*/g, " ");

            command = `powershell -NoProfile -ExecutionPolicy Bypass -Command "${psScript}"`;
        } else {
            // macOS / Linux
            const pathParts = srcPath.split("/");
            const folderName = pathParts.pop() || pathParts.pop();
            const parentDir = pathParts.join("/");

            command = `zip -r "${destPath}" "${folderName}"`;
            options = { cwd: parentDir };
        }

        cp.exec(command, options, (error: any, stdout: string, stderr: string) => {
            if (error) {
                console.error("压缩执行失败:", stderr || error.message);
                return reject(new Error(stderr || error.message));
            }
            resolve();
        });
    });
}