const player = {
    name: 'Player',
    maxHp: 50,
    baseHp: 50,
    baseAtk: 8,
    baseDef: 5,
    spcAtk: 10,
    baseSpeed: 8,
}

const rat = {
    name: 'Rat',
    maxHp: 20,
    baseHp: 20,
    baseAtk: 8,
    baseDef: 1,
    spcAtk: 5,
    baseSpeed: 10,
}
const skeleton = {
    name: 'Skeleton',
    maxHp: 35,
    baseHp: 35,
    baseAtk: 10,
    baseDef: 2,
    spcAtk: 10,
    baseSpeed: 7
}
const troll = {
    name: 'Troll',
    maxHp: 50,
    baseHp: 50,
    baseAtk: 12,
    baseDef: 4,
    spcAtk: 15,
    baseSpeed: 1
}

const enemyArray = [rat, skeleton, troll]

const killCount = document.getElementById('kill-count')

const playerDiv = document.getElementById('player-container')
const enemyDiv = document.getElementById('enemy-container')

const playerName = document.getElementById('player-name')
const playerHp = document.getElementById('player-hp')


const enemyName = document.getElementById('enemy-name')
const enemyHp = document.getElementById('enemy-hp')


const fightBtn = document.getElementById('fight-btn')
const defBtn = document.getElementById('def-btn')
const healBtn = document.getElementById('heal-btn')
const fleeBtn = document.getElementById('flee-btn')

let killCountNumber = 0
killCount.innerHTML = killCountNumber

const randomEnemy = (enemies) =>{
    randomIndex = Math.floor(Math.random()*enemies.length)
    return enemies[randomIndex]
}



const checkDeath = (player, enemy)=>{
    if(enemy.baseHp <= 0){
        console.log(`The ${enemy.name} was defeated!`)
        killCountNumber += 1
        killCount.innerHTML = killCountNumber
        
    }else if(player.baseHp <= 0){
        console.log(`You were defeated by a wild ${enemy.name}. GAME OVER`)
        return
    }
}

const enemyFreeAttack = (player, enemy) =>{
    player.baseHp = Math.max(player.baseHp - (enemy.baseAtk - player.baseDef),0)
}

const fightMechanics = (player, enemy, action) =>{

    if(action == 'fight'){
      
        enemy.baseHp = Math.max(enemy.baseHp - (player.baseAtk - enemy.baseDef),0)
        player.baseHp = Math.max(player.baseHp - (enemy.baseAtk - player.baseDef),0)
        updateHealthBar(enemyHp, enemy.baseHp, enemy.maxHp)
        updateHealthBar(playerHp, player.baseHp, player.maxHp)
        playerHp.innerHTML = player.baseHp
        enemyHp.innerHTML = enemy.baseHp
        checkDeath(player,enemy)

    }else if (action == 'defend') {
        const damageNegated = Math.max((enemy.baseAtk - (1.5 * player.baseDef)), 0);
        
        if (damageNegated > 0) {
            player.baseHp = Math.max(player.baseHp - damageNegated, 0);
            updateHealthBar(playerHp, player.baseHp, player.maxHp)
            updateHealthBar(enemyHp, enemy.baseHp, enemy.maxHp)
            playerHp.innerHTML = player.baseHp;
            enemyHp.innerHTML = enemy.baseHp;
            checkDeath(player, enemy);
        }
    }else if(action == 'heal'){

        const randomHeal = Math.floor(Math.random() * 8) + 3; 
        player.baseHp = Math.min(player.baseHp + randomHeal, 50)
        player.baseHp = player.baseHp - Math.max((enemy.baseAtk - player.baseDef),0)
        updateHealthBar(playerHp, player.baseHp, player.maxHp)
        
        updateHealthBar(enemyHp, enemy.baseHp, enemy.maxHp)
        playerHp.innerHTML = player.baseHp
        enemyHp.innerHTML = enemy.baseHp
        checkDeath(player, enemy)

    }else if(action == 'flee'){

        const initPlayerSpeedModifyer =  Math.floor(Math.random() * 11)
        const playerSpeedModifyer = initPlayerSpeedModifyer <=5 ? initPlayerSpeedModifyer : initPlayerSpeedModifyer -11
   
        const initEnemySpeedModifyer =  Math.floor(Math.random() * 11)
        const enemySpeedModifyer = initEnemySpeedModifyer <=5 ? initPlayerSpeedModifyer : initPlayerSpeedModifyer -11

        if(playerSpeedModifyer  > enemySpeedModifyer){
            console.log('You escaped')
            playerHp.innerHTML = player.baseHp
            enemyHp.innerHTML = enemy.baseHp
            
        
        }else{
            console.log(`You could not escape and the ${enemy.name} attacked again`)
            enemyFreeAttack(player, enemy)
            updateHealthBar(playerHp, player.baseHp, player.maxHp)
            updateHealthBar(enemyHp, enemy.baseHp, enemy.maxHp)
            checkDeath(player, enemy)
            playerHp.innerHTML = player.baseHp
            enemyHp.innerHTML = enemy.baseHp

        }
    }   
}

const updateHealthBar = (element, currentHp, maxHp) => {
    const percentage = (currentHp / maxHp) * 100;
   
    element.style.width = percentage + '%';
    
    if (percentage <= 20) {
        element.style.backgroundColor = '#f00'; 
    } else if (percentage <= 50) {
        element.style.backgroundColor = '#ff0';
    } else {
        element.style.backgroundColor = '#0f0'; 
    }
}

const startEncounter = () =>{
   

    let enemy = randomEnemy(enemyArray)

    playerName.innerText = player.name 
    enemyName.innerText = enemy.name

    playerHp.innerText =  player.baseHp
    enemyHp.innerText = enemy.baseHp

    fightBtn.addEventListener('click',()=>{
        fightMechanics(player, enemy, 'fight')
        
    })
    defBtn.addEventListener('click', ()=>{
        fightMechanics(player, enemy, 'defend')
    })
    healBtn.addEventListener('click', ()=>{
        fightMechanics(player,enemy,'heal')
    })
    fleeBtn.addEventListener('click', ()=>{
        fightMechanics(player, enemy, 'flee')
    })
}

startEncounter()






