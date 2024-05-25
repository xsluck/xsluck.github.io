<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>TVBox配置接口解密</title>
    <!-- 引入Bootstrap样式库 -->
    <link rel="stylesheet" href="./css/bootstrap.min.css">
    <style>
        body {
            margin-top: 40px;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 0 15px;
        }
        .input-group {
            margin-bottom: 20px;
        }
        .loading {
            display: none;
            margin-top: 20px;
        }
        @media (max-width: 768px) {
            .container {
                max-width: 100%;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="text-center mb-5">TVBox配置接口解密</h1>
        <div class="input-group mb-3">
            <input type="text" class="form-control" id="url" value="" placeholder="输入接口地址">
            <button class="btn btn-secondary" type="button" onclick="crawl()">解密</button>
        </div>
       
        <div class="text-center loading" id="loading">
          <div class="spinner-border" role="status">
            野<span class="visually-hidden">Loading...</span>
          </div>
        </div>
       
        <textarea class="form-control" id="result" cols="80" rows="20" readonly></textarea>
        <div class="text-center mt-3">
             <button class="btn btn-warning" onclick="copyText()">复制</button>
            
        </div>
    </div>
    <!-- 引入Bootstrap JS库 -->
    <script src="./jsa/bootstrap.min.js"></script>
    <script>
        function crawl() {
            var xhr = new XMLHttpRequest();
            var url = document.getElementById('url').value;
            var resultBox = document.getElementById('result');
            
            
            
            
            xhr.open("GET", "http://shixiong.alwaysdata.net/mao.php?url=" + encodeURIComponent(url), true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    resultBox.value = xhr.responseText;
                    document.getElementById('loading').style.display = 'none';
                }
            };
            resultBox.value = '';
            document.getElementById('loading').style.display = 'block';
            xhr.send();
        }
        function copyText() {
          var copyText = document.getElementById("result");
          copyText.select();
          copyText.setSelectionRange(0, 99999);
          document.execCommand("copy");
          alert("偷取成功！");
        }


    </script>

<script src="https://static.app/js/static.js" type="text/javascript"></script>
</body>
</html>