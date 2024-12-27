// src-tauri/src/ai.rs
use tauri::command;

#[command]
pub fn ask_ai(query: String) -> String {
    // 处理 AI 查询的逻辑
    format!("AI received query: {}", query)
}
