// post-build.js
import fs from "fs-extra";
import path from "path";

async function postBuild() {
  // 强制使用当前进程启动时的目录（即 package.json 所在的工程根目录）
  const rootDir = process.cwd();

  const distPath = path.resolve(rootDir, "dist/cep");
  const scriptsSrc = path.resolve(rootDir, "install_scripts");

  console.log(`根目录: ${rootDir}`);
  console.log(`目标目录: ${distPath}`);

  try {
    // 1. 检查并复制安装脚本
    if (fs.existsSync(scriptsSrc)) {
      console.log("正在复制安装脚本...");
      await fs.copy(scriptsSrc, distPath);
      const macScriptPath = path.join(distPath, "MacOS_install.command");
      if (fs.existsSync(macScriptPath)) {
        fs.chmodSync(macScriptPath, 0o755);
        console.log("已成功为 install_mac.command 赋予执行权限 (755)");
      }
    } else {
      console.warn("警告: 未找到 install_scripts 目录");
    }

    // 2. 删除 .debug
    const debugFile = path.join(distPath, ".debug");
    if (fs.existsSync(debugFile)) {
      console.log("正在移除 .debug 文件...");
      await fs.remove(debugFile);
    }

    // 3. 删除 node_modules (如果为空)
    const nodeModulesPath = path.join(distPath, "node_modules");
    if (fs.existsSync(nodeModulesPath)) {
      const files = await fs.readdir(nodeModulesPath);
      if (files.length === 0) {
        console.log("正在移除空的 node_modules 文件夹...");
        await fs.remove(nodeModulesPath);
      }
    }

    console.log("Post-build 成功完成！");
  } catch (err) {
    console.error("执行出错:", err);
    process.exit(1);
  }
}

postBuild();