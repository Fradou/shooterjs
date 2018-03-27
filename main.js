window.onload = function (){
    new Vue({
        el:'#app',
        data:{

            currentMob: {
                xMin: 0,
                xMax: 0,
                yMin: 0,
                yMax: 0,
                hpMax: 0,
                hpCur: 0,
                model: 0
            }
        }
        methods: {
            fire: function(event){
                var x = event.clientX;
                var y = event.clientY;


            }
        }
