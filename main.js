window.onload = function (){
    new Vue({
        el:'#arena',
        mounted:function(){
            this.initArena();
        },
        data:{
            shoots: 0,
            weapons: {
                "gun": {
                    dmg: 1,
                    barrel : 6,
                    shootDelay: 0.5,
                    reloadTime:0.5
                },
                "shotgun": {
                    dmg: 3,
                    barrel : 4,
                    shootDelay: 0.5,
                    reloadTime: 1
                },
                "sniper": {
                    dmg: 5,
                    barrel : 1,
                    shootDelay: 0,
                    reloadTime: 2
                }
            },
            currentMob: {
                xMin: 0,
                xMax: 1300,
                yMin: 0,
                yMax: 1000,
                hpMax: 0,
                hpCur: 0,
                model: 0
            },

            currentWeapon: "gun",
            currentStreak: 0
        },
        methods: {
            fire: function(event){
                var x = event.clientX;
                var y = event.clientY;

                var mob = this.currentMob;

                console.log("Shoot : " + x + "-" + y);
                if((x <= mob.xMax && x >= mob.xMin && y <= mob.yMax && y >= mob.yMin)){
                    this.checkStreak();
                    this.registerShot();
                }
                else {
                    this.currentStreak=0;
                }
            },
            registerShot(){

                var weapon = this.weapons[this.currentWeapon];
                var dmg = weapon.dmg;
                var mobHp = this.currentMob.hpCur;

                if(dmg>=mobHp){
                    this.killDone();
                }
                else {
                    this.currentMob.hpCur = mobHp - dmg;
                    this.shoots++;
                }
            },
            initArena(){
                this.createNewMob();
            },
            killDone(){
                this.createNewMob();
            },
            createNewMob(){
                this.currentMob.hpMax =  Math.floor(Math.random() * Math.floor(5)) + 5;
                this.currentMob.hpCur = this.currentMob.hpMax;
            },
            checkStreak(){
                this.currentStreak++;
                var weaponStreak = this.weaponStreak();
                if(this.currentWeapon != weaponStreak){
                    this.currentWeapon = weaponStreak;
                }
            },
            weaponStreak(){
                var streak = this.currentStreak;

                if(streak <= 10) {
                    return "gun";
                }
                else if (streak <= 20) {
                    return "shotgun";
                }
                else {
                    return "sniper";
                }
            },
            reloadWeapon(event){
                event.stopPropagation();
            }
        },
        components: {
            'healthBar': {
                props: ['maxHp', 'curHp']
            },
            'monster': {
                props: ['']
            }
        }
    })
}
