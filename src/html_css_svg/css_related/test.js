
/*
function Popup() {
}

Popup.prototype.open = function() {
$(window).on('resize', this.resize.bind(this))
}

 What implementation of the method close will correctly remove the call of the method "resizie" ?
 Popup.close = function(){ $(window).off(‘resize’,this.resize)) }
 Popup.close = function(){ $(window).off(‘resize’,this.resize.bind(this)) }
 */

