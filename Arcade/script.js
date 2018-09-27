// IFFE
(function() {
    // Object Literal Notation
    var app = {
        init: function() {
            console.log('Test');

            // Dom elementen oproepen
            this.arcadeCharacterElement = document.querySelector('.arcade-character');

            // Rows colls hoeveelheid blokjes
            this.acRows = 18;
            this.acCols = 18;
            this.acWidth = 15;
            this.createArcadeCharacterMatrix();

            // Functie om random character te tonen
            this.randomArcadeCharacter();
        },
        createArcadeCharacterMatrix: function() {
            var tempStr = '', top = 0, left = 0;
            
            for(var i=0;i<this.acRows;i++) {
                for(var j=0;j<this.acCols;j++) {
                    tempStr += `<div class="led led--off" data-row="${i}" data-col="${j}" style="top:${top}px;left:${left}px"></div>`;

                    left += this.acWidth;
                }
                top += this.acWidth;
                left = 0;
            }
            this.arcadeCharacterElement.innerHTML = tempStr;
        },
        randomArcadeCharacter: function() {
            var pattern = '';
            for(var i=0;i<this.acRows;i++) {
                var tempStr = '';
                for(var j=0;j<Math.ceil(this.acCols/2);j++) {
                    tempStr += Math.round(Math.random());
                }
                var tempStrAsArray = tempStr.split('').reverse();
                if(this.acCols % 2 != 0) {
                    tempStrAsArray = tempStrAsArray.slice(1, tempStrAsArray.length);
                }
                tempStr = tempStr + tempStrAsArray.join('');
                pattern += tempStr;                
            }

            for(var i=0;i<this.acRows;i++) {
                for(var j=0;j<this.acCols;j++) {
                    var bit = pattern.charAt((i*this.acCols)+j);
                    var ledElement = this.arcadeCharacterElement.querySelector(`.led[data-row="${i}"][data-col="${j}"]`);
                    if(bit == '1' && ledElement.classList.contains('led--off')) {
                        ledElement.classList.remove('led--off');
                        ledElement.classList.add('led--on');
                    }
                    if(bit == '0' && ledElement.classList.contains('led--on')) {
                        ledElement.classList.remove('led--on');
                        ledElement.classList.add('led--off');
                    }
                }
            }
        }
    };
	app.init(); // Call the init() function from the object literal

	// MAKEN VAN AUTOMATISCHE UPDATER
	
})();