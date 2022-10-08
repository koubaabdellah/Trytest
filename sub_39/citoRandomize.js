define(function() {
    return {
        citoShuffle: function( arr ) {
            if( arr.length < 2 ) return arr;
            var rand, temp, i;
            for (i = arr.length - 1; i > 0; i -= 1) {
                rand = Math.floor((i + 1) * Math.random());//get random between zero and i (inclusive)
                temp = arr[rand];//swap i and the zero-indexed number
                arr[rand] = arr[i];
                arr[i] = temp;
            }
            return arr;
        }
    }
    
});