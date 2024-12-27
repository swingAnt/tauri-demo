import { WebviewWindow, } from '@tauri-apps/api/webviewWindow'
import { Window ,} from '@tauri-apps/api/window';
import { LogicalPosition, Position } from '@tauri-apps/api/dpi';
export async function createWebviewWindow(url: string,label:string) {
  try {
    // 获取主窗口
    const mainWindow = await Window.getByLabel('main'); // 这是你主窗口的 label

    if (!mainWindow) {
      console.error('Main window not found!');
      return;
    }

    // 获取主窗口的位置和尺寸
    const { width, height, } = await mainWindow.innerSize(); // 获取窗口尺寸
    const mainWindowPosition = await mainWindow.outerPosition(); // 获取窗口位置
    console.log('mainWindowPosition',mainWindowPosition)
    console.log('height',height)
    const screenWidth = window.screen.availWidth; // 屏幕宽度
    const screenHeight = window.screen.availHeight; // 屏幕高度
    console.log('screenWidth',screenWidth)

    // 计算居中位置
    const x = Math.floor((screenWidth - 800) / 2);  // 水平方向居中
    // 检查是否已存在弹出窗口
    const existingWindow = await WebviewWindow.getByLabel(label);
    if (existingWindow) {
      const isVisible = await existingWindow.isVisible();
      if (isVisible) {
        // await existingWindow.hide();
      } else {
        await existingWindow.show();
      }
      return;
    }
    // 创建新的弹出窗口
    const webview = new WebviewWindow(label, {
      center: false, // 不自动居中
    //   x: mainWindowPosition.x-400, // 使用主窗口的 X 坐标
    // y: mainWindowPosition.y +height+50,
    x,
    y: 170,

    // x:0,
      width: 800, // 宽度与主窗口一致
      height: 600, // 高度可以根据内容自适应
    //   alwaysOnTop: true,
    //   skipTaskbar: false,
      decorations: false, // 禁用默认窗口装饰
      closable: true, // 允许关闭窗口
      url: 'http://localhost:1420' + url,
    });
    console.log('webview',webview)

    // 监听 Webview 创建成功
    webview.once('tauri://created', function () {
      console.log('Webview window created');
    });

    // 监听 Webview 创建失败
    webview.once('tauri://error', function (e) {
      console.log('Error creating Webview window:', e);
    });

  } catch (error) {
    console.error('Error creating Webview window:', error);
  }
}

export async function positionWindow() {
  try {
    // 获取主窗口实例
    const windowx = new WebviewWindow('main');  // 确保你使用的是正确的窗口标签
    console.log('windowx',windowx)

    // 获取窗口的宽度和高度
    // const { width, height } = await windowx.innerSize(); // 获取窗口的宽度和高度
    // console.log('width',width)
    // console.log('height',height)
    const width=800;
    const height=100;
    // 获取屏幕的可用宽度和高度（使用浏览器的 window.screen 对象）
    const screenWidth = window.screen.availWidth; // 屏幕宽度
    const screenHeight = window.screen.availHeight; // 屏幕高度
    console.log('screenWidth',screenWidth)

    // 计算居中位置
    const x = Math.floor((screenWidth - width) / 2);  // 水平方向居中
    const y = 50;  // 设置 y 坐标为固定的 50px
    const position = new Position(new LogicalPosition(x, y));
    console.log('x',x)
    console.log('y ',y )


  // 使用 Position 对象来设置窗口位置
  await windowx.setPosition(position);

    console.log(`Window size: width=${width}, height=${height}`);
    console.log(`Window position set to: x=${x}, y=${y}`);
  } catch (error) {
    console.error('Error setting window position:', error);
  }
}
export async function calculatePosition(windowLabel: string) {
    try {
     // 获取主窗口
     const mainWindow = await Window.getByLabel(windowLabel); // 这是你主窗口的 label

     if (!mainWindow) {
       console.error('Main window not found!');
       return { x: 0, y: 0 }; // 默认返回 (0, 0)
     }
 
     // 获取主窗口的位置和尺寸
     const { width, height, } = await mainWindow.innerSize(); // 获取窗口尺寸
     const mainWindowPosition = await mainWindow.outerPosition(); // 获取窗口位置
     console.log('mainWindowPosition',mainWindowPosition)
     console.log('height',height)
 
 

      return {        
        x: mainWindowPosition.x-400, // 使用主窗口的 X 坐标
        y: mainWindowPosition.y +height+50};
    } catch (error) {
      console.error('Error calculating window position:', error);
      return { x: 0, y: 0 }; // 默认返回 (0, 0)
    }
  }
  
export async function positionResultWindow(label:string) {
    try {
        const {x,y} = await calculatePosition('main'); // 'main' 是主窗口的标签，800x600 是弹出窗口的尺寸

      const windowx = new WebviewWindow(label);  // 确保你使用的是正确的窗口标签
      console.log('windowx',windowx)
  
      const position = new Position(new LogicalPosition(0,0));
      console.log('x',x)
      console.log('y ',y )
  
  
    // 使用 Position 对象来设置窗口位置
    await windowx.setPosition(position);
  
  
      console.log(`Window position set to: x=${x}, y=${y}`);
    } catch (error) {
      console.error('Error setting window position:', error);
    }
  }
  