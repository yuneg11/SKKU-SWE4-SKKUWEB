function hideNavi(id) {
	var navi = document.getElementById(id);
	if(navi.style.visibility == "hidden")
		navi.style.visibility = "visible";
	else
		navi.style.visibility = "hidden";
}

function changeTableStyle(common_id) {
	i = 0;
	do {
		id = common_id + "_" + i;
		t = document.getElementById(id)

		if(t == null) break;

		t = t.getElementsByTagName("table");
		
		for(var j = 0; j < t.length; j++) {
			if(t[j].className == "table table-striped table-dark")
				t[j].className = "table table-striped table-hover";
			else
				t[j].className = "table table-striped table-dark";
		}

		i++;
	} while(t != null);
}

function isValidForm(form_name) {
	var valid = true;

	$(form_name).children("p").children("input").each(function() {
		if($.trim($(this).val()) == '')
			valid = false;
	});

	return valid;
}

function refreshCourselist() {
	$.ajax({
		type: "GET",
		url: "/courselist",
		success: function(res){
			if(res.result == "success") {
				var table_content = "";

				for(var i in res.data) {
					table_content += "<tr>";
					table_content += ("<td>" + res.data[i].class_id + "</td>");
					table_content += ("<td>" + res.data[i].class_name + "</td>");
					table_content += ("<td>" + res.data[i].professor + "</td>");
					table_content += ("<td>" + res.data[i].credit + "</td>");
					table_content += ("<td>" + res.data[i].max_students + "</td>");
					table_content += ("<td>" + res.data[i].registered + "</td>");
					table_content += "</tr>";
				}

				$(".list_table_content").html(table_content);
			} else {
				alert("Course list loading failed!");
			}
		}
	});
}

function refreshStudentinfo() {
	if($("#student_info_name").html() == '') {
		$.ajax({
			type: "GET",
			url: "/studentinfo",
			success: function(res){
				if(res.result == "success") {
					$("#student_info_name").html(res.data.name);
					$("#student_info_id").html(res.data.student_id);
					$("#student_info_birth").html(res.data.birth.toString().split("T")[0]);
					$("#student_info_credit").html(res.data.credit);
					$("#student_info_department").html(res.data.department);
				} else {
					alert("Course list loading failed!");
				}
			}
		});
	}
}

function activateContent(content_id) {
	if(content_id == "#courselist_content") {
		refreshCourselist();
	} else if(content_id == "#studentinfo_content") {
		refreshStudentinfo();
	}
	$(content_id).addClass("active");
}

$(function() {
	if(location.pathname == "/gls") {
		var hashs = {
			"#": "#home",
			"#AC": "#addcourse",
			"#CL": "#courselist",
			"#SI": "#studentinfo",
			"#CI": "#courseinfo",
			"#CB": "#coursebag"
		};
		var hash = $(location).attr('hash');

		if(hash == '') hash = "#";

		$(".active").removeClass("active");
		$(hashs[hash]).addClass("active");
		activateContent(hashs[hash]+"_content");
	}

	$("#login").click(function() {
		$("#register_popup").slideUp();
		$("#login_popup").slideToggle();
	});

	$("#register").click(function() {
		$("#login_popup").slideUp();
		$("#register_popup").slideToggle();
	});

	$(".nav-link").click(function() {
		$(".active").removeClass("active");

		var button_id = $(this).attr("id");
		var content_id = button_id + "_content";
		$(this).addClass("active");
		activateContent('#'+content_id);
	});
	
	$("#login_request").click(function() {
		if(isValidForm("#login_form")) {
			var formData = $("#login_form").serialize();

			$.ajax({
				type: "POST",
				url: "/login",
				data: formData,
				success: function(res) {
					if(res.result == "success") {
						location.reload();
					} else {
						alert("Student ID or Password is wrong!");
					}
				}
			});
		} else {
			alert("Fill all input!");
		}
	});

	$("#logout").click(function() {
		$.ajax({
			type: "POST",
			url: "/logout",
			success: function(res) {
				location.reload();
			}
		});
	});

	$("#register_request").click(function() {
		if(isValidForm("#register_form")) {
			var formData = $("#register_form").serialize();

			$.ajax({
				type: "POST",
				url: "/register",
				data: formData,
				success: function(res){
					if(res.result == "success") {
						alert("Registration success");
					} else if(res.result == "duplicate") {
						alert("Duplicated ID!");
					} else {
						alert("Registeration failed");
					}
				}
			});
		} else {
			alert("Fill all input!");
		}
	});

	$("#addcourse_request").click(function() {
		if(isValidForm("#addcourse_form")) {
			var formData = $("#addcourse_form").serialize();

			$.ajax({
				type: "POST",
				url: "/addcourse",
				data: formData,
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
		} else {
			alert("Fill all input!");
		}
	});
});