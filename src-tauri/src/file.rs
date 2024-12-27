// src-tauri/src/file.rs
use tauri::command;

#[command]
pub fn upload_file(file_path: String) -> String {
    // 处理文件上传的逻辑
    format!("File uploaded at: {}", file_path)
}
