
class Character{

    constructor (defaultStats){
        // ---------------------------------- STATS
        this.totalLife = defaultStats.totalLife;
        // ---------------------------------- CURRENT
        this.currentLife = this.life;
        this.inventory = [];
        this.currentTorch = defaultStats.torchLife;
    };

    // ----------------------------------------------------------------------------------------------------------------- ACTIONS

    damageTorch (damageLevel)
    {
        this.currentTorch -= damageLevel;
    }

    damageLife (damageLevel)
    {
        this.currentLife -= damageLevel;
    }

    // ----------------------------------------------------------------------------------------------------------------- GETTERS

    getCurrentLife ()
    {
        return this.currentLife;
    }

    getCurrentTorch ()
    {
        return this.currentTorch;
    }

    torchIsDead ()
    {
        return (this.currentTorch == 0);
    }

    bagIsEmpty ()
    {
        return (this.inventory.length == 0);
    }

}

module.exports = Character;
