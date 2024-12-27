// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// 引入模块
mod ai; // 确保引入 ai.rs 文件
mod file; // 确保引入 file.rs 文件


// 使用 Tauri 的命令处理功能
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

// 应用的运行函数
fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())  // 插件初始化
        .invoke_handler(tauri::generate_handler![greet, ai::ask_ai, file::upload_file]) // 注册命令
        .run(tauri::generate_context!())  // 运行 Tauri 应用
        .expect("error while running tauri application");
}
