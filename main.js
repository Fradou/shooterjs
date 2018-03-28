window.onload = function (){
    new Vue({
        el:'#arena',
        mounted:function(){
            this.initArena();
        },
        data:{
            shoots: 0,
            weapons: [
                {
                    id: 1,
                    name:"gun",
                    dmg: 1,
                    barrel : 6,
                    shootDelay: 0.5,
                    reloadTime:0.5
                },
                {
                    id: 2,
                    name:"shotgun",
                    dmg: 3,
                    barrel : 4,
                    shootDelay: 0.5,
                    reloadTime: 1
                },
                {
                    id: 3,
                    name:"sniper",
                    dmg: 5,
                    barrel : 1,
                    shootDelay: 0,
                    reloadTime: 2
                }
            ],
            currentMob: {
                xMin: 0,
                xMax: 1300,
                yMin: 0,
                yMax: 1000,
                hpMax: 0,
                hpCur: 0,
                model: 0
            },

            currentWeapon: null,
            clipFilling: 0,
            canShoot: true,

            currentStreak: 0
        },
        methods: {
            fire: function(event){
                if(this.canShoot){
                    this.clipFilling--;
                    this.checkClip();

                    var x = event.clientX;
                    var y = event.clientY;

                    var mob = this.currentMob;

                    console.log("Shoot ok : " + x + "-" + y);
                    if((x <= mob.xMax && x >= mob.xMin && y <= mob.yMax && y >= mob.yMin)){
                        this.currentStreak++;
                        this.checkStreak();
                        this.registerShot();
                    }
                    else {
                        this.currentStreak=0;
                    }
                }
            },
            registerShot(){
                var dmg = this.currentWeapon.dmg;
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
                this.changeWeapon(this.weapons[0]);
            },
            killDone(){
                this.createNewMob();
            },
            createNewMob(){
                this.currentMob.hpMax =  Math.floor(Math.random() * Math.floor(5)) + 5;
                this.currentMob.hpCur = this.currentMob.hpMax;
            },
            changeWeapon(newWeapon){
                console.log("Weapon changed");
                this.currentWeapon = newWeapon;
                this.clipFilling = this.currentWeapon.barrel;
            },
            reloadWeapon(event){
                event.stopPropagation();
                this.clipFilling = this.currentWeapon.barrel;
                this.canShoot = true;
            },
            checkStreak: function(){

                var value = this.currentStreak;

                if(value <= 10 && this.currentWeapon.id !=1) {
                    this.changeWeapon(weapons[0]);
                }
                else if (value <= 20 && this.currentWeapon.id !=1) {
                    this.changeWeapon(weapons[1]);
                }
                else if (value > 20 && this.currentWeapon.id != 2) {
                    this.changeWeapon(weapons[2]);
                }
            },
            checkClip: function() {
                if(this.clipFilling == 0) {
                    this.canShoot = false;
                }
            }
        },
        components: {
            'healthBar': {
                props: ['maxHp', 'curHp']
            },
            'monster': {
                props: ['']
            },
            'waitTimer': {
                props: ['name', 'duration']
            }
        }
    })
}
