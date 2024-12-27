mod ai; // 确保引入 ai.rs 文件
mod file; // 确保引入 file.rs 文件

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet,ai::ask_ai, file::upload_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
