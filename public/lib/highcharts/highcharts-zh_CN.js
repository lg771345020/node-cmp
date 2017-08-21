/**
 * Highcharts-zh_CN plugins v1.0.0 (2017-02-22)
 *
 * (c) 2017 Jianshu Technology CO.,LTD (https://jianshukeji.com)
 *
 * Author : John@jianshukeji.com, Blue Monkey
 *
 * License: Creative Commons Attribution (CC)
 */

(function(H) {
    var protocol = window.location.protocol;

    var defaultOptionsZhCn = {
        lang: {
            // Highcharts
            contextButtonTitle: '图表导出菜单',
            decimalPoint: '.',
            downloadJPEG: "下载JPEG图片",
            downloadPDF: "下载PDF文件",
            downloadPNG: "下载PNG文件",
            downloadSVG: "下载SVG文件",
            drillUpText: "返回 {series.name}",
            invalidDate: '无效的时�?',
            loading: '加载�?...',
            months: ['丢��?', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一�?', '十二�?'],
            noData: "没有数据",
            numericSymbols: null,
            printChart: "打印图表",
            resetZoom: '重置缩放比例',
            resetZoomTitle: '重置为原始大�?',
            shortMonths: ['丢��?', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一�?', '十二�?'],
            thousandsSep: ',',
            weekdays: ['星期丢�', '星期�?', '星期�?', '星期�?', '星期�?', '星期�?', '星期�?'],

            // Highstock
            rangeSelectorFrom: '弢�始时�?',
            rangeSelectorTo: '结束时间',
            rangeSelectorZoom: '缩放',

            // Highmaps
            zoomIn: '缩小',
            zoomOut: '放大'
        },
        global: {
            useUTC: true,
            //timezoneOffset: -8 * 60,
            canvasToolsURL: protocol + '//cdn.hcharts.cn/highcharts/modules/canvas-tools.js',
            VMLRadialGradientURL: protocol + +'//cdn.hcharts.cn/highcharts/gfx/vml-radial-gradient.png'
        },

        title: {
            text: '图表标题'
        },
        tooltip: {
            dateTimeLabelFormats: {
                millisecond: '%H:%M:%S.%L',
                second: '%H:%M:%S',
                minute: '%H:%M',
                hour: '%H:%M',
                day: '%Y-%m-%d',
                week: '%Y-%m-%d',
                month: '%Y-%m',
                year: '%Y'
            }
        },

        exporting: {
            url: protocol + '//export.highcharts.com.cn'
        },
        credits: {

            text: 'Highcharts',
            href: 'https://highcharts.com.cn',

        },
        xAxis: {
            dateTimeLabelFormats: {
                millisecond: '%H:%M:%S.%L',
                second: '%H:%M:%S',
                minute: '%H:%M',
                hour: '%H:%M',
                day: '%Y-%m-%d',
                week: '%Y-%m-%d',
                month: '%Y-%m',
                year: '%Y'
            }
        }
    };

    H.setOptions(defaultOptionsZhCn);
}(Highcharts));