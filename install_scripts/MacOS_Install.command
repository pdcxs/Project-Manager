#!/bin/bash

# 获取脚本所在的当前目录
cd "$(dirname "$0")" || exit

DEST_DIR="$HOME/Library/Application Support/Adobe/CEP/extensions/Project-Manager"

echo "[1/2] 正在准备插件目录..."

# 如果目录存在则删除
if [ -d "$DEST_DIR" ]; then
  echo "正在清理旧版本..."
  rm -rf "$DEST_DIR"
fi

# 创建目录并复制内容
mkdir -p "$DEST_DIR"
echo "正在复制文件..."
cp -R "assets" "$DEST_DIR/"
cp -R "CSXS" "$DEST_DIR/"
cp -R "jsx" "$DEST_DIR/"
cp -R "main" "$DEST_DIR/"

echo "[2/2] 正在配置 Adobe 调试模式 (PlayerDebugMode)..."

# 循环设置 CSXS.1 到 CSXS.12
for n in {1..12}; do
  defaults write com.adobe.CSXS."$n" PlayerDebugMode 1
done

echo ""
echo "=========================================="
echo "安装完成！请重启 Adobe 软件查看插件。"
echo "=========================================="