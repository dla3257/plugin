/*전역 변수 정의 윷놀이*/
var yut_count = 0; //던진 윷의 카운트 전역변수 저장
var total_count = 0; //총 윳던진 총 합
var total_count2 = 0; //대각선 총 윳던진 총 합
var total_count3 = 0; //대각선 총 윳던진 총 합
var run_com = 0; //완주 횟수
var point_place = 0 //각 꼭지점 포인트 장소 체크
var move_interval;
var move_interval2;
var move_interval3;
var move_idx = 0;
var move_idx2 = 0; // 대각선 인덱싱 값
var move_idx3 = 0; // 대각선 인덱싱 값
var point_chk = 0; //포인트 체크
var back_flag = false;
var point_back = false; //포인트 지점에서의 백도의 경우 기존 함수 변경 호출 위해 필요
/*테스트 랜덤*/
var k = 0;
function random_i(){
    k = Math.floor(Math.random() * 5) + 1;
    alert(k+"번 이동");
    run_yut(k);
}
function run_yut(i){
    console.log("run_yut 함수"+i+"칸 이동");
    if(i < 0){ /*빽도일경우*/
        back_flag = true;
    }
    yut_count = i;
    if(point_chk == 1){
        /*첫번째 꼭지점*/
        total_count2 = total_count2 + i;
        point_place = 1;
        move_interval2 = setInterval(move_point2,100);    
    }else if(point_chk == 3){
        /*가운데 꼭지점*/
        total_count3 = total_count3 + i;
        point_place = 3;
        move_interval3 = setInterval(move_point3,100);    
    }else if(point_chk == 0){
        total_count = total_count + i;
        move_interval = setInterval(move_point,100);    
    }
}
function move_point(){
    console.log("move_point 함수 기본 싸이클 point_back 프레그 값"+point_back);
    var $char = $(".point_move");
    if(back_flag == true){
        move_idx = move_idx - 2;
        back_flag = false;
    }
    if(move_idx > 19){
        goal();
    }else{
        if(move_idx < total_count){
            if(total_count / 5 == 1){
               if(point_back == false){
                    point_chk = 1;
               }else{
                    point_chk = 0;
               }
            }else if(total_count / 5 == 2){
                if(point_back == false){
                    point_chk = 3;
                }else{
                    point_chk = 0;
                }
            }else{
                point_chk = 0;
            }
            move_idx = move_idx + 1;
            console.log("총 : "+total_count);
            console.log("증가값"+move_idx);
            point_back = false;
            var m_left = $(".point"+move_idx).position().left;
            var m_top = $(".point"+move_idx).position().top;
            $char.css({"left":m_left+"px","top":m_top+"px"});
        }else{
            console.log("a");
            clearInterval(move_interval);
        }
    }
}
function move_point2(){
    var $char = $(".point_move");
    console.log("move_point2 함수 기본 싸이클 point_back 프레그 값"+point_back);
    
    console.log(total_count2);
    if(back_flag == true){
        move_idx2 = move_idx2 - 2;
        back_flag = false;
    }
    if(move_idx2 != total_count2){
        move_idx2 = move_idx2 + 1;
        console.log(move_idx2);
        console.log(total_count2);
        if(total_count2 < 1){
            point_back = true;
            clearInterval(move_interval2);
            point_chk = 0;
            if(total_count2 < 0){
               move_idx = 3;
                total_count = 4;
            }else{
               move_idx = 4;
                total_count = 5;
            }
            move_idx2 = 0;
            total_count2 = 0;
            move_point();
        }else{
            point_back = false;
            if(move_idx2 > 5){
                /*대각선의 끝*/
                console.log("끝 도착");
                clearInterval(move_interval2);
                move_idx = 14;
                total_count = 15+total_count2-move_idx2;
                point_chk = 0;
                move_interval = setInterval(move_point,100);
            }else{
                var m_left = $(".point5_"+move_idx2).position().left;
                var m_top = $(".point5_"+move_idx2).position().top;
                $char.animate({"left":m_left+"px","top":m_top+"px"},0,function(){
                    if(move_idx2 == 3 && total_count2 == 3){
                        /*중간 꼭지점*/
                        console.log("중간");
                        clearInterval(move_interval2);
                        point_chk = 3;
                        move_idx3 = 3;
                        total_count3 = 3;
                        move_interval3 = setInterval(move_point3,100);
                    }
                });;
            }
            
        }
    }else{
        clearInterval(move_interval2);
    }
}
function move_point3(){
    console.log("move_point3 함수 기본 싸이클 point_back 프레그 값"+point_back);
    var $char = $(".point_move");
    if(back_flag == true){
        move_idx3 = move_idx3 - 2;
        back_flag = false;
    }
    if(move_idx3 < 6){
        if(move_idx3 != total_count3){
            move_idx3 = move_idx3 + 1;
            if(total_count3 < 1){
                point_back = true;
                clearInterval(move_interval3);
                point_chk = 0;
                move_idx = 8;
                total_count = 9;
                move_idx3 = 0;
                total_count3 = 0;
                move_point();
            }else{
                point_back = false;
                var m_left = $(".point10_"+move_idx3).position().left;
                var m_top = $(".point10_"+move_idx3).position().top;
                $char.animate({"left":m_left+"px","top":m_top+"px"},0,function(){
                    if(move_idx3 >= 6 && total_count3 >= 6){
                        clearInterval(move_interval3);
                        goal();
                    }
                    else if(total_count3 <= 1){
                        clearInterval(move_interval3);
                        point_chk = 0;
                        move_idx = 11;
                        total_count = 11;
                    }
                });;
            }
        }else{
            clearInterval(move_interval3);
        }
    }
}
function goal(){
        console.log("완주");
        var $char = $(".point_move");
        clearInterval(move_interval);
        clearInterval(move_interval2);
        clearInterval(move_interval3);
        $char.css({"left":"1000px","top":"1000px"});
        run_com = run_com + 1;
        console.log(run_com+"회 완주");
        move_idx = move_idx*0;
        total_count = total_count*0;
        move_idx2 = move_idx2*0;
        total_count2 = total_count2*0;
        move_idx3 = move_idx3*0;
        total_count3 = total_count3*0;
        point_chk = 0;
}