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
		$(hashs[hash]+"_content").addClass("active");
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
		$('#'+content_id).addClass("active");
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
						location.href = "/gls#CL";
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