### 简答题

#### 1. Webpack的构建流程主要有哪些环节？如果可以请尽可能详尽的描述Webpack打包的整个过程。

1. 通过 Webpack CLI 解析 CLI 参数，与指定配置文件或默认配置文件合并，得到完整的配置选项；
2. 载入 Webpack 核心模块，创建Compiler对象；
3. 使用 Compiler 对象开始编译整个项目；
4. 从Entry里配置的Module开始，递归解析Entry依赖的所有Module；
5. 每找到一个Module,就会根据配置的Loader去找出对应的转换规则，对Module进行转换后，再解析出当前Module依赖的Module；
6. 这些模块会以Entry为单位进行分组，一个Entry及其所有依赖的Module被分到一个组也就是一个Chunk，最后，webpack会将所有Chunk转换成文件输出。
7. 在整个流程中，webpack会在恰当的时机执行Plugin里定义的逻辑。

---

#### 2. Loader 和 Plugin 有哪些不同？ 请描述一下开发 Loader 和 Plugin 的思路。

​	通俗点讲就是` loader`是转换，`plugin`是执行比转换更复杂的任务。

​	`loader`本质上就是一个函数，这个函数会在我们在我们加载一些文件时执行，也就是说`loader`能让`webpack`能够处理非js文件，然后就可以利用`webpack`的打包能力，对它们进行处理。在实际项目中，可以考虑一部分公共的简单逻辑，可以通过编写一个`loader`来完成。

​	`plugin`是一个扩展器，它丰富了`webpack`本身，针对是`loader`结束后，`webpack`打包的整个过程，它并不是直接操作文件，而是基于事件机制工作，会监听`webpack`打包过程中的某些节点，执行广泛的任务。`plugin`通常是在`webpack`在打包的某个时间节点做一些操作，我们使用`plugin`的时候，一般都是`new Plugin()`这种形式使用，所以，首先应该明确的是，`plugin`应该是一个类。

---

### 编程题

#### 使用 Webpack 实现 Vue 项目打包任务





