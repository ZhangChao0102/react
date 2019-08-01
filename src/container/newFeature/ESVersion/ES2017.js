import React from 'react';

function ES2017(props) {

    const test = new Worker('../../../vendor/WebWorker');
    console.log(test);

    return <section className="es-content">
        <div className="feature-item">
            <p>
                1. Async 函数呈现更清晰的 Promise 语法
            </p>
        </div>
        <div className="feature-item">
            <p>
                2. Object.values 方法返回一个给定对象自己的所有可枚举属性值的数组，值的顺序与使用for...in循环的顺序相同（区别在于for...in循环枚举原型链中的属性）
            </p>
        </div>
        <div className="feature-item">
            <p>
                3. Object.entries()方法返回一个给定对象自身可枚举属性的键值对数组，其排列与使用for...in循环遍历改对象时返回的顺序一致（
                区别在于for...in循环也枚举原型链中的属性）
            </p>
        </div>
        <div className="feature-item">
            <p>
                4.
                Object.getOwnPropertyDescriptors()返回一个对象的所有自身属性的描述符（.value,.writable,.get,.set,.configurable,enumerable）
            </p>
        </div>
        <div className="feature-item">
            <p>
                5. padStart()和padEnd()，填充字符串达到当前长度
            </p>
        </div>
        <div className="feature-item">
            <p>
                6. 结尾逗号，数组定义和函数参数列表
            </p>
        </div>
        <div className="feature-item">
            <p>
                7. SharedArrayBuffer和Atomics用于从共享内存位置读取和写入
            </p>
        </div>
    </section>;
}

export default ES2017;