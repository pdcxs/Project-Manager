@echo off
setlocal enabledelayedexpansion

:: --- 自动提权逻辑开始 ---
:check_Permissions
    echo 正在检查管理员权限...
    net session >nul 2>&1
    if %errorLevel% == 0 (
        echo 成功获取管理员权限
    ) else (
        echo 正在请求管理员权限...
        powershell -Command "Start-Process '%~dpnx0' -Verb RunAs"
        exit /b
    )
:: --- 自动提权逻辑结束 ---

set "DEST_DIR=%APPDATA%\Adobe\CEP\extensions\Project-Manager"

echo.
echo [1/2] 正在准备插件目录...
if exist "%DEST_DIR%" (
    echo 正在清理旧版本: %DEST_DIR%
    rd /s /q "%DEST_DIR%"
)

mkdir "%DEST_DIR%"
echo 正在复制文件...
xcopy /e /y "%~dp0assets" "%DEST_DIR%\assets\" >nul
xcopy /e /y "%~dp0CSXS" "%DEST_DIR%\CSXS\" >nul
xcopy /e /y "%~dp0jsx" "%DEST_DIR%\jsx\" >nul
xcopy /e /y "%~dp0main" "%DEST_DIR%\main\" >nul

echo.
echo [2/2] 正在配置 Adobe 调试模式 (PlayerDebugMode)...
for /l %%n in (1,1,12) do (
    reg add "HKEY_CURRENT_USER\Software\Adobe\CSXS.%%n" /v PlayerDebugMode /t REG_SZ /d 1 /f >nul 2>&1
)

echo.
echo ==========================================
echo 安装完成！请重启 Adobe 软件查看插件。
echo ==========================================
pause