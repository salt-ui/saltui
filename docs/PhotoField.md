

上传/查看图片的组件。

此组件包括两个版本：
    * 钉钉版：是对钉钉 Native API 的封装，只能在钉钉容器内运行，且运行 demo 时需要在钉钉的白名单域名下。
    * H5 版：是对 [uploadcore](https://github.com/uxcore/uploadcore) 的 H5 封装。

![image](https://img.alicdn.com/tfs/TB1L0TISXXXXXbDaXXXXXXXXXXX-350-240.png)


## Props

| name               | type          | default | Required   |  description |
|----------          |---------------|---------|------------|------------|
|photoList           | array         | []      |   yes      |用于展示的文件列表|
|className           | string        |         |            | |
|locale              | string        | zh-cn   |            | 国际化，目前支持 `zh-cn`, `en-us`|
|columns             | number        | 4       |            | 显示的图片分几列 |
|label               | string        |         |            | 显示在fild左侧的名字 |
|layout              | string        | h       |            | label 布局,支持上下结构`v`和左右结构`h`。|
|max                 | number        | 3       |            | 一次性同时上传的图片数量 |
|readOnly            | bool          | false   |            | 是否只读，只读时不能输入 |
|corpId              | string        |         |            | 钉钉公司 corpId，使用钉钉版本必填 |
|name                | string        | 'file'  |            | 上传文件字段名称 |

除此之外，该组件继承自 [Field](https://salt-ui.github.io/components/field)，支持所有基类的属性。

### photoList 的最小格式 (格式稍显麻烦，是为了 onChange 的返回值可以传回给 fileList)

```javascript
[
    {
        name: '', // 文件名称，列表形式必填
        response: {
            url: xxx,  // 文件链接，必填
        }
    }
]
```


## Other Props （H5专属）

H5 版是对 [uploadcore](https://github.com/uxcore/uploadcore) 的 H5 封装，故详细使用说明可以参考：[uploadcore 使用文档](https://github.com/uxcore/uploadcore)

| name               | type          | default | Required   |  description |
|----------          |---------------|---------|------------|------------|
|url                 | string        | ''      |            | 响应上传服务器地址 |
|params              | object/array  | null    |            | 上传文件额外参数 |
|headers             | array         | null    |            | 上传文件额外头 |
|withCredentials     | bool          | false   |            | 上传文件是否自动附带cookie等信息 |
|timeout             | int           | 0       |            | 上传超时限制 0表示不限制 |
|chunkEnable         | bool          | false   |            | 是否允许分片上传 |
|chunkSize           | size          | 0       |            | 文件分片大小, 默认单位b，0不分片 |
|chunkRetries        | int           | 0       |            | 文件分片上传重试次数 |
|chunkProcessThreads | int           | 2       |            | 分片上传并发数 |
|processThreads      | int           | 2       |            | 文件上传并发数 |
|autoPending         | bool          | true    |            | 是否选择后自动等待上传 |
|multiple            | bool          | true    |            | 是否多选，在钉钉 5.3.6 版本以前的容器中不支持， | 
|accept              | string/array  | null    |            | 允许文件类型, [chrome 下的已知问题](http://stackoverflow.com/questions/39187857/inputfile-accept-image-open-dialog-so-slow-with-chrome) |
|sizeLimit           | size          | 0       |            | 文件大小限制, 0表示不限制 |
|preventDuplicate    | bool          | false   |            | 是否防止文件重复 |

### Events

| name     | arguments    | description      |
|----------|--------------|------------------|
| onChange | values, photos   | 上传图片回调，values 是一个数组，里面为上传的多张图片 url, photos 为变化后的 fileList 的合集|
| onDelete | index        | 删除图片回调，index 是序号 |
| onImagePreview | index        | 点击图片预览回调，index 是序号，如不设置该回调，则使用ImageViewer预览图片，如设置该回调，需自行处理如何进行图片预览 |

### onChange 的 fileList 的枚举格式有如下几种
```javascript
[
    // 上传后的文件的格式， response 即服务器返回的值
    {
        type: 'upload',
        ext: file.ext,
        name: file.name,
        response: JSON.parse(file.response.rawResponse.rawResponse)
    },
    // 预览用文件的格式， `props.fileList` 相关， responce 即 `props.fileList` 里传入的格式。
    {
        type: 'list',
        response: file
    },
    // 被删除的文件的格式
    {
        type: 'delete',
        subType: 'list/upload', // 与上面两种类型对应，用于解析 response
        response: file // 与上面的 subType 相对应
    }
]
```



### Other Events （H5专属）

| name     | arguments    | description      |
|----------|--------------|------------------|
|onqueueuploadstart | | 队列上传开始 |
|onqueueuploadend | | 队列上传结束 |
|onqueuefileadded | `File` | 队列添加了一个文件 |
|onqueuefilefiltered | `File`, `Error` | 队列过滤了一个文件 |
|onfileuploaderror | `File`, `Error` | 文件上传失败 | 
|onqueueerror | `Error` | 队列错误 |
|onstatchange | `Stat` | 文件统计发生变化 |
|onfileuploadstart | `File` | 文件上传开始 |
|onfileuploadpreparing | `FileRequest` | 文件上传准备时 |
|onfileuploadprepared | `File`, `FileRequest` | 文件上传准备好了 |
|onchunkuploadpreparing | `ChunkRequest` |  分块上传准备时 |
|onchunkuploadcompleting | `ChunkResponse` |  分块上传结束时 |
|onfileuploadprogress | `File`, `Progress` | 文件上传进度中 |
|onfileuploadend | `File` | 文件上传结束 |
|onfileuploadcompleting | `FileResponse` |  文件上传结束时 |
|onfileuploadsuccess | `File`, `FileResponse` | 文件上传成功 |
|onfileuploadcompleted | `File`, `Status`| 文件上传完成了 |
|onfilestatuschange | `File`, `Status` | 文件状态发生变化 |
|onfilecancel | `File` | 文件退出 |

