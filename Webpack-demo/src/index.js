import {hello} from './libs/kkb';
import './css/css.css';
import fn from './libs/fn';
//这个默认情况下是undefined
//但是在devServer配置了hot:true和hotOnly之后就不一样了
// console.log(module.hot)
fn()
if (module.hot) {//如果开启 HMR

    // accept ： 事件监听，以模块为单位，监听webpack通知过来到模块变化
    module.hot.accept('./libs/kkb', () => {
        //这里就是React框架那个数据更新的核心，监听到哪个模块发生改变了就执行相应的函数，把变化的重新渲染到页面上

        console.log('kkb变了');
        document.onclick = hello;
    });

    module.hot.accept('./libs/fn', () => {
        console.log('fn变了');
        fn();
    });
}

document.onclick = hello;