<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%
	String path = request.getContextPath();
	String basePath = "";
	basePath =request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
	basePath ="http://wx.smemall.net/";
	
%>
<!DOCTYPE>
<html>
<head>
<meta charset="UTF-8">
<base href="<%=basePath%>">
<title>${policy.title }</title>
<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport">
<meta name="keywords" content="" />
<meta name="description" content="" />
<link type="text/css" rel="stylesheet" href="resources/css/webcss.css" />
</head>
<body>
<div id="header">
	<a href="javascript:history.go(-1)" class="up-data"></a>
	<a href="/wx/index" class="home-icon"></a>
</div>
<!-- 头部 -->
<div class="container">
	<div class="panel">
		<h1 class="article-h1">${policy.title }</h1>
		<div class="article-info">${policy.time }</div>
		<div class="article-content">
			${policy.text}
		</div>
	</div>			
</div>
	${policy.text}
<jsp:include page="footer.jsp" flush="true" />
</body>
</html>