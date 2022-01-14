class Board {
    constructor(map_width, map_height){
        this.width = map_width
        this.height = map_height
        this.fields_array = []
        this.tiles_on_board = [] // divs that are representation of fields array
        this.snake = []
        this.snake_head = 0
        this.apples
    
    }

    generate_field(){
        let array_2d = []
        for(let d2 = 0; d2 < this.height; d2++){
            let dim_2 = []
            for(let i = 0; i < this.width; i++){
                dim_2.push(0)
            }
            array_2d.push(dim_2)
        }

        return array_2d
    }

    set_arr_field(){
        this.fields_array = this.generate_field()
    }

    //render field to the screen
    render(){
        for(let row = 0; row < this.height; row++){
            let row_div = document.createElement('div')
            
            for(let col = 0; col < this.width; col++){
                let col_div = document.createElement('div')
                col_div.classList.add('tile')
                row_div.append(col_div)

                this.tiles_on_board.push(col_div)
            }
            game_div.append(row_div)
        }
    }

    create_snake_head(){
        let cords = this.randomize_start_position()
        let position = cords[0] + cords[1] * this.width
        this.snake_head = position
        this.snake.push(position)

        let head = this.tiles_on_board[position]
        head.style.backgroundColor = 'lime'

    }
    
    randomize_start_position(){
        //init x and y position of starting element
        let x = Math.floor(Math.random() * this.width)
        let y = Math.floor(Math.random() * this.height)

        let coordinates = []
        coordinates.push(x)
        coordinates.push(y)
        return coordinates
    }

    refresh_snake(){
        let to_remove = this.snake
        console.log(to_remove, "sadjsj", this.snake.length)


        this.tiles_on_board[this.snake[this.snake.length - 1]].style.backgroundColor = 'wheat'
        this.snake.pop()
    }

    render_snake(){
        let head_pos = this.snake_head

        this.snake.unshift(head_pos)

        this.tiles_on_board[this.snake[0]].style.backgroundColor = 'lime'
    }
    
    handle_keypress(board){
        document.addEventListener('keypress', function(e){
            let _this = board
            let key = e.code
            console.log(key)
            
            switch(key){
                case 'KeyA':
                    _this.refresh_snake()
                    _this.snake_head -= 1 
                    _this.render_snake()
                    break

                case 'KeyS':
                    _this.refresh_snake()
                    _this.snake_head += _this.width
                    _this.render_snake()
                    break

                case 'KeyD':
                    _this.refresh_snake()
                    _this.snake_head += 1
                    _this.render_snake()
                    break

                case 'KeyW':
                    _this.refresh_snake()
                    console.log(_this.snake_head)
                    _this.snake_head -= _this.width
                    console.log(_this.snake_head)
                    _this.render_snake()
                    break

                default:
                    console.log('bruh')
            }
        })
    }

    spawn_apple(){

    }
}


let game_div = document.getElementById('game_div')

//create instance of a game
let board = new Board(10,10)
console.log(board)

//make array of zeroes and render it to screen
board.set_arr_field()
board.render()
board.create_snake_head()
board.handle_keypress(board)
console.table(board.fields_array)

