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
					alert("Student info loading failed!");
				}
			}
		});
	}
}

function isInArray(item, array) {
	for(var i in array)
		if(array[i] == item)
			return true;
	return false;
}

function refreshCourseinfo() {
	$.ajax({
		type: "GET",
		url: "/courseinfo",
		success: function(res){
			if(res.result == "success") {
				var table_content = "";
				for(var i in res.course) {
					if(isInArray(res.course[i].class_id, res.register)) {
						table_content += "<tr>";
						table_content += ("<td>" + res.course[i].class_id + "</td>");
						table_content += ("<td>" + res.course[i].class_name + "</td>");
						table_content += ("<td>" + res.course[i].professor + "</td>");
						table_content += ("<td>" + res.course[i].credit + "</td>");
						table_content += ("<td>" + res.course[i].max_students + "</td>");
						table_content += "</tr>";
					}
				}
				$(".list_table_content").html(table_content);
			} else {
				alert("Course info loading failed!");
			}
		}
	});
}

function refreshCoursebag() {
	$.ajax({
		type: "GET",
		url: "/coursebag",
		success: function(res){
			if(res.result == "success") {
				var coursebag_content1 = "";
				var coursebag_content2 = "";
				for(var i in res.course) {
					coursebag_content1 += "<tr>";
					coursebag_content1 += ("<td>" + res.course[i].class_id + "</td>");
					coursebag_content1 += ("<td>" + res.course[i].class_name + "</td>");
					coursebag_content1 += ("<td>" + res.course[i].professor + "</td>");
					coursebag_content1 += ("<td>" + res.course[i].credit + "</td>");
					coursebag_content1 += ("<td>" + res.course[i].max_students + "</td>");
					coursebag_content1 += ("<td><button class='btn btn-success' id='putinbag_" + i + "'>Put in your bag</button></td>");
					coursebag_content1 += "</tr>";
					$("#coursebag_content1").on("click", "#putinbag_"+i, function(){
						var class_num = this.id.split("_")[1];
						$.ajax({
							type: "POST",
							url: "/coursebag/putinbag",
							data: {class_id: res.course[class_num].class_id},
							success: function(res){
								if(res.result == "success")
									location.reload();
								else
									alert("Already in your course bag!");
							}
						});
					});

					if(isInArray(res.course[i].class_id, res.bag)) {
						coursebag_content2 += "<tr>";
						coursebag_content2 += ("<td>" + res.course[i].class_id + "</td>");
						coursebag_content2 += ("<td>" + res.course[i].class_name + "</td>");
						coursebag_content2 += ("<td>" + res.course[i].professor + "</td>");
						coursebag_content2 += ("<td>" + res.course[i].credit + "</td>");
						coursebag_content2 += ("<td>" + res.course[i].max_students + "</td>");
						coursebag_content2 += ("<td>" + res.course[i].registered + "</td>");
						coursebag_content2 += ("<td><button class='btn btn-info' id='putoutbag_" + i + "'>Put out from your bag</button></td>");
						coursebag_content2 += "</tr>";
					}
					$("#coursebag_content2").on("click", "#putoutbag_"+i, function(){
						var class_num = this.id.split("_")[1];
						$.ajax({
							type: "POST",
							url: "/coursebag/putoutbag",
							data: {class_id: res.course[class_num].class_id},
							success: function(res){
								if(res.result == "success")
									location.reload();
								else
									alert("Already out from your course bag!");
							}
						});
					});
				}
				$("#coursebag_content1").html(coursebag_content1);
				$("#coursebag_content2").html(coursebag_content2);
			} else {
				alert("Course bag loading failed!");
			}
		}
	});
}

function activateContent(content_id) {
	if(content_id == "#courselist_content") {
		refreshCourselist();
	} else if(content_id == "#studentinfo_content") {
		refreshStudentinfo();
	} else if(content_id == "#courseinfo_content") {
		refreshCourseinfo();
	} else if(content_id == "#coursebag_content") {
		refreshCoursebag();
	}
	$(content_id).addClass("active");
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