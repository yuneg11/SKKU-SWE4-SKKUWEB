function hideNavi() {
	if($("#my_nav").css("visibility") == "hidden")
		$("#my_nav").css("visibility", "visible");
	else
		$("#my_nav").css("visibility", "hidden");
}

function changeTableStyle() {
	if($("table").hasClass("table-dark")) {
		$("table").removeClass("table-dark");
		$("table").addClass("table-hover");
	} else {
		$("table").removeClass("table-hover");
		$("table").addClass("table-dark");
	}
}

function validateForm(form_name) {
	var valid = true;
	$(form_name).children("p").children("input").each(function() {
		if($.trim($(this).val()) == '') {
			alert("Fill all input!");
			valid = false;
		}
	});
	return valid;
}

function registerStudent() {
	if(validateForm("#register_form")) {
		$.ajax({
			type: "POST",
			url: "/register",
			data: $("#register_form").serialize(),
			success: function(res){
				if(res.result == "success")
					alert("Registration success");
				else if(res.result == "duplicate")
					alert("Duplicated ID!");
				else
					alert("Registeration failed");
			}
		});
	}
}

function login() {
	if(validateForm("#login_form")) {
		$.ajax({
			type: "POST",
			url: "/login",
			data: $("#login_form").serialize(),
			success: function(res) {
				if(res.result == "success")
					location.reload();
				else
					alert("Student ID or Password is wrong!");
			}
		});
	}
}

function logout() {
	$.ajax({
		type: "GET",
		url: "/logout",
		success: function() {
			location.reload();
		}
	});
}

function addCourse() {
	if(validateForm("#addcourse_form")) {
		$.ajax({
			type: "POST",
			url: "/addcourse",
			data: $("#addcourse_form").serialize(),
			success: function(res){
				if(res.result == "success") {
					location.replace("/gls#CL");
					location.reload();
				} else if(res.result == "duplicate") {
					alert("There is already that course!");
				} else {
					alert("Registeration failed");
				}
			}
		});
	}
}

function coursebagPutinbag(student_id, class_id){
	$.ajax({
		type: "POST",
		url: "/coursebag/putinbag",
		data: {student_id: student_id, class_id: class_id},
		success: function(res){
			if(res.result == "success")
				location.reload();
			else
				alert("Already in your course bag!");
		}
	});
}

function coursebagPutoutbag(student_id, class_id){
	$.ajax({
		type: "POST",
		url: "/coursebag/putoutbag",
		data: {student_id: student_id, class_id: class_id},
		success: function(res){
			if(res.result == "success")
				location.reload();
			else
				alert("Already out from your course bag!");
		}
	});
}

function sugangCancel(student_id, class_id) {
	$.ajax({
		type: "POST",
		url: "/sugang/cancel",
		data: {student_id: student_id, class_id: class_id},
		success: function(res){
			if(res.result == "success")
				location.reload();
			else
				alert("Cancel failed!");
		}
	});
}

function sugangRegister(student_id, class_id) {
	$.ajax({
		type: "POST",
		url: "/sugang/register",
		data: {student_id: student_id, class_id: class_id},
		success: function(res){
			if(res.result == "success")
				location.reload();
			else if(res.result == "duplicate")
				alert("Already registered the course!");
			else if(res.result == "seat_limit")
				alert("There is no seat!");
			else if(res.result == "credit_limit")
				alert("Not enough credit!");
			else
				alert("Registration failed!");
		}
	});
}

function switchPage(page) {
	var dynamic_contents = {
		"H": false, "AC": false, "CL": true,
		"SI": true, "CI": true, "CB": true
	};

	$(".active").removeClass("active");
	if(dynamic_contents[page]) {
		location.href = location.pathname+'#'+page;
		location.reload();
	}
	$('#'+page+'_link').addClass("active");
	$('#'+page+"_content").addClass("active");
}

function showLogin() {
	$("#register_popup").slideUp();
	$("#login_popup").slideToggle();
}

function showRegister() {
	$("#login_popup").slideUp();
	$("#register_popup").slideToggle();
}

$(function() {
	if(location.pathname == "/gls") {
		var hash = $(location).attr('hash');
		if(hash == '') hash = "#H";

		$(".active").removeClass("active");
		$(hash+"_link").addClass("active");
		$(hash+"_content").addClass("active");
	}
});