$(function () {

	var prizeNameArray = [
		"Birdie Travel SIM (5 days Asia package)", 
		"Birdie Travel SIM (4 days Asia package)", 
		"Mcdonald $20 coupon", 
		"Birdie Doll", 
		"SmarTone 5G tote bag", 
		"Higher Living English Breakfast Organic Tea"
	];

	var prizeNameArrayZh = [
		"自由鳥遨遊SIM  (5日亞洲12地)", 
		"自由鳥遨遊SIM  (4日亞洲12地)", 
		"麥當勞 $20 現金券", 
		"自由鳥公仔", 
		"SmarTone 5G 手提袋", 
		"Higher Living 天然有機茶包"
	];

	
	let prizeMap = new Map();
	prizeMap.set(0, prizeNameArray[0]);
	prizeMap.set(1, prizeNameArray[1]);
	prizeMap.set(2, prizeNameArray[2]);
	prizeMap.set(3, prizeNameArray[3]);
	prizeMap.set(4, prizeNameArray[4]);
	prizeMap.set(5, prizeNameArray[5]);



	$('.roulette').find('img').hover(function () {
		console.log($(this).height());
	});
	var appendLogMsg = function (msg) {
		$('#msg')
			.append('<p class="muted">' + msg + '</p>')
			.scrollTop(100000000);

	}
	var p = {
		startCallback: function () {
			appendLogMsg('start');
			$('#speed, #duration').slider('disable');
			$('#stopImageNumber').spinner('disable');
			$('.start').attr('disabled', 'true');
			$('.stop').removeAttr('disabled');
		},
		slowDownCallback: function () {
			appendLogMsg('slowdown');
			$('.stop').attr('disabled', 'true');
		},
		stopCallback: function ($stopElm) {
			appendLogMsg('stop');
			$('#speed, #duration').slider('enable');
			$('#stopImageNumber').spinner('enable');
			$('.start').removeAttr('disabled');
			$('.stop').attr('disabled', 'true');
			$('.prize_name').show();
			$('.prize_name_zh').show();

			// $('.image_sample').children().filter('[data-value="' + Number($('.stop_image_number_param').text()) + '"]').css('opacity' , 1);
		}

	}
	var rouletter = $('div.roulette');
	rouletter.roulette(p);
	$('.stop').click(function () {
		var stopImageNumber = $('.stopImageNumber').val();
		if (stopImageNumber == "") {
			stopImageNumber = null;
		}
		rouletter.roulette('stop');
	});
	$('.stop').attr('disabled', 'true');
	$('.start').click(function () {

		while(true){
			var prizeNumber = Math.floor((Math.random() * 6));
			console.log("prizr no. " + prizeNumber);
			if(prizeMap.has(prizeNumber)){
				console.log("start");
				break;
			}
			console.log("draw again");
		}
		updateStopImageNumber(prizeNumber);
		$('#speed').value
		rouletter.roulette('start');
	});

	var updateParamater = function () {
		// p['speed'] = Number($('.speed_param').eq(0).text());
		// p['duration'] = Number($('.duration_param').eq(0).text());
		// p['stopImageNumber'] = Number($('.stop_image_number_param').eq(0).text());
		console.log(Number($('.stop_image_number_param').eq(0).text()));
		p['speed'] = 80;
		p['duration'] = 1;
		p['stopImageNumber'] = Number($('.stop_image_number_param').eq(0).text());
		rouletter.roulette('option', p);
	}
	var updateSpeed = function (speed) {
		console.log("update Speed")
		$('.speed_param').text(speed);
	}
	$('#speed').slider({
		min: 1,
		max: 30,
		value: 10,
		slide: function (event, ui) {
			updateSpeed(ui.value);
			updateParamater();
		}
	});
	updateSpeed($('#speed').slider('value'));

	var updateDuration = function (duration) {
		$('.duration_param').text(duration);
	}
	$('#duration').slider({
		min: 2,
		max: 10,
		value: 3,
		slide: function (event, ui) {
			updateDuration(ui.value);
			updateParamater();
		}
	});
	updateDuration($('#duration').slider('value'));

	var updateStopImageNumber = function (stopImageNumber) {
		console.log("updateStopImageNumber")
		// $('.image_sample').children().css('opacity' , 0.2);
		// $('.image_sample').children().filter('[data-value="' + stopImageNumber + '"]').css('opacity' , 1);
		$('.stop_image_number_param').text(stopImageNumber);
		$('.prize_name').hide();
		$('.prize_name_zh').hide();
		$('.prize_name').text(prizeNameArray[stopImageNumber]);
		$('.prize_name_zh').text(prizeNameArrayZh[stopImageNumber]);
		// $('.prize_name').text("prize1");
		updateParamater();
	}

	$('#stopImageNumber').spinner({
		spin: function (event, ui) {
			var imageNumber = ui.value;
			if (ui.value > 4) {
				$(this).spinner("value", -1);
				imageNumber = 0;
				updateStopImageNumber(-1);
				return false;
			} else if (ui.value < -1) {
				$(this).spinner("value", 4);
				imageNumber = 4;
				updateStopImageNumber(4);
				return false;
			}
			updateStopImageNumber(imageNumber);
		}
	});
	$('#stopImageNumber').spinner('value', 0);
	updateStopImageNumber($('#stopImageNumber').spinner('value'));

	// $('.image_sample').children().click(function(){
	// 	var stopImageNumber = $(this).attr('data-value');
	// 	$('#stopImageNumber').spinner('value', stopImageNumber);
	// 	updateStopImageNumber(stopImageNumber);
	// });

	$('.image_sample').children().click(function (e) {
		var index = $(this).attr('data-value');
		toggleImage(index);
		$('#stopImageNumber').spinner('value', index);
		updateStopImageNumber(index);
	});

	var toggleImage = function (index) {
		console.log("toggleImage " + index);

		if ($('.image_sample').children().filter('[data-value="' + index + '"]').hasClass("opClass")) {
			$('.image_sample').children().filter('[data-value="' + index + '"]').removeClass('opClass');
			prizeMap.set(parseInt(index), prizeNameArray[parseInt(index)]);
			var iterator1 = prizeMap[Symbol.iterator]();

			for (let item of iterator1) {
				console.log(item);
			}


		} else {
			$('.image_sample').children().filter('[data-value="' + index + '"]').addClass('opClass');
			prizeMap.delete(parseInt(index));
			var iterator1 = prizeMap[Symbol.iterator]();

			for (let item of iterator1) {
				console.log(item);
			}
		}
	}
});

