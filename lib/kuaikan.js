var rule={
    title:'快看',
    host:'https://www.kuaikanys.net',
    // homeUrl:'/',
    url:'/s/fyfilter/page/fypage.html',
	filterable:1,//是否启用分类筛选,
	filter_url:'{{fl.cateId}}',
	filter: {"dianying":[{"key":"cateId","name":"类型","value":[{"n":"全部","v":"dianying"},{"n":"动作片","v":"dongzuopian"},{"n":"喜剧片","v":"xijupian"},{"n":"爱情片","v":"aiqingpian"},{"n":"科幻片","v":"kehuanpian"},{"n":"言情片","v":"yanqingpian"},{"n":"恐怖片","v":"kongbupian"},{"n":"剧情片","v":"juqingpian"},{"n":"战争片","v":"zhanzhengpian"}]}],"lianxuju":[{"key":"cateId","name":"类型","value":[{"n":"全部","v":"lianxuju"},{"n":"国产剧","v":"guochanju"},{"n":"港台剧","v":"gangtaiju"},{"n":"日韩剧","v":"rihanju"},{"n":"欧美剧","v":"oumeiju"},{"n":"其他剧","v":"qitaju"}]}]},
	filter_def:{
		dianying:{cateId:'dianying'},
		lianxuju:{cateId:'lianxuju'},
		zongyi:{cateId:'zongyi'},
		dongman:{cateId:'dongman'}
	},
    searchUrl:'/index.php/ajax/suggest?mid=1&wd=**',
    searchable:2,//是否启用全局搜索,
    quickSearch:0,//是否启用快速搜索,
	图片来源:'@Referer=https://www.kuaikanys.net/@User-Agent=Mozilla/5.0%20(Windows%20NT%2010.0;%20Win64;%20x64)%20AppleWebKit/537.36%20(KHTML,%20like%20Gecko)%20Chrome/113.0.0.0%20Safari/537.36',
    class_parse:'nav ul li;a&&Text;a&&href;.*/(.*?)\.html',
	cate_exclude:'专题',
    play_parse:true,
	    lazy:`js:
		var html=JSON.parse(request(input).match(/r player_.*?=(.*?)</)[1]);
        log(html);
		var url=html.url;
		if(html.encrypt=='1'){
        url=unescape(url)
        }else if(html.encrypt=='2'){
        url=unescape(base64Decode(url))
        }
        var apiurl = 'https://dm.zui.cm/vip/zuixian.php';
        var purl = JSON.parse(request(apiurl, {
            headers: {
                'Referer': 'https://dm.zui.cm/vip/?url='
            },
            body: 'url=' + url + '&tp=checkPlay',
            method: 'POST'
        })).url;
        input = {
            jx: 0,
            url: /m3u8|mp4/.test(url) ? url: purl,
            parse: 0
        }
    `,
    limit:6,
    推荐:'.show:eq(1);ul&&li;*;*;*;*',
    double:true, // 推荐内容是否双层定位
    一级:'.show&&ul&&li;a&&title;img&&src;.score&&Text;a&&href',
    // 二级:{"title":"h1&&Text;.info&&ul&&p&&Text","img":"img&&src","desc":".info&&ul&&p:eq(-2)&&Text;.info&&ul&&p:eq(-1)&&Text;.info&&ul&&p:eq(0)&&Text;.info&&ul&&p:eq(1)&&Text;.info&&ul&&p:eq(2)&&Text;.info&&ul&&p:eq(3)&&Text","content":".text&&Text","tabs":".play&&span","lists":".playlist&&ul:eq(#id) li"},
    二级:{
	    "title":"h1&&Text;.info&&ul&&p&&Text",
	    "img":"img&&src",
	    "desc":";;;.info ul li:eq(0)&&Text;.info ul li:eq(1)&&Text;.info&&ul&&p:eq(3)&&Text",
	    // "content":".text p&&Text",
	    "content":".text&&Text",
	    "tabs":".play&&span",
	    "lists":".playlist&&ul:eq(#id) li"
	},
	    //搜索:'json:list;name;pic;id;id',
		搜索:`js:
        var d = [];
        let html = request(input);
        html = JSON.parse(html);
        html.list.forEach(function(it) {
            d.push({
                title: it.name,
                img: it.pic,
                desc: '',
                url: 'https://www.kuaikanys.net/v/' + it.id + '.html',
                content: ''
            })
        });
        setResult(d);
    `,
}	
		