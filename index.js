'use strict'
/**
 * @params {number} the old factor of the previous day
 * @params {number} the quality of review
 */

function calcFactor(oldFac, quality) {
    let factor = oldFac + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    return Math.max(1.3, factor);
}

/**
 * @params {number} a number between 0~5 representing the quality of review. 0 is the worse while 5 is the best.
 * @params {number} the factor of last schedual
 */
module.exports = function (quality, lastSchedule, lastFactor) {
    let newFac;
    let curSchedule;
    
    if(quality == null || quality < 0 || quality > 5) {
        quality = 0;
    }
    
    if(lastSchedule === 1) {
        curSchedule = 6
        newFac = calcFactor(lastFactor, quality)
    } else if(!lastSchedule || lastSchedule === 0) {
        curSchedule = 1
        if (!lastFactor||lastFactor===0){
            newFac = 2.5
        }else{
            newFac = calcFactor(lastFactor, quality)
        }
    } else {
        if(quality < 3) {
            newFac = lastFactor
            curSchedule = 1
        } else {
            newFac = calcFactor(lastFactor, quality)
            curSchedule = Math.round(lastSchedule * newFac)
        }
    }
    
    return {
        factor: newFac,
        schedule: curSchedule,
        needReview: quality < 4,
        needRestart: quality < 3
    }
}
