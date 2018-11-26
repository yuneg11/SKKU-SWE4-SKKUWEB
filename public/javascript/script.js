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


$(function(){
	$("#login").click(function(){
		$("#register_popup").slideUp();
		$("#login_popup").slideToggle();
	});

	$("#register").click(function(){
		$("#login_popup").slideUp();
		$("#register_popup").slideToggle();
	});


	$(".nav-link").click(function(){
		/* this is midterm's answer. just refer it.

		var id = ['navHome', 'navStInfo', 'navGradeInfo', 'navClassInfo'];
		for(var i=0;i<id.length;i++)
		{
			if($(this).attr('class') == 'nav-link disabled')
				break;

			if($(this).attr('id') == id[i])
			{
				$('#'+id[i]).removeClass('link');
				$('#'+id[i]).addClass('active');
				$('#'+id[i]+'Content').show();
			}
			else
			{
				$('#'+id[i]).removeClass('active');
				$('#'+id[i]).addClass('link');
				$('#'+id[i]+'Content').hide();
			}

		}
		*/
	});

	
	$("#login_request").click(function() {
		if(isValidForm("#login_form")) {
			var formData = $("#login_form").serialize();
			$.ajax({
				type : "POST",
				url : "/login",
				data : formData,
				success : function(res) {
					if(res.result == "success") {
						location.reload();
					} else {
						alert("Student ID or Password is wrong!");
					}
				}
			});
		} else {
			alert('Fill all input!');
		}
	});

	$("#logout").click(function() {
		$.ajax({
			type : "POST",
			url : "/logout",
			success : function(res) {
				location.reload();
			}
		});
	});

	$("#register_request").click(function() {
		if(isValidForm("#register_form")) {
			var formData = $("#register_form").serialize();

			$.ajax({
				type : "POST",
				url : "/register",
				data : formData,
				success : function(res){
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
			alert('Fill all input!');
		}
	});
});