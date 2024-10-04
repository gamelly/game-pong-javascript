window.Game = {
    meta: {
        title: "Ping Pong",
        author: "Rodrigo Dornelles"
    },
    callbacks: {
        init: (std, game) => {
            this.score = 0;
            this.highscore = this.highscore == null ? 0 : this.highscore;
            this.player_size = game.height / 8;
            this.player_pos = game.height / 2 - this.player_size / 2;
            this.ball_pos_x = game.width / 2;
            this.ball_pos_y = game.height / 2;
            this.ball_spd_x = 0.3;
            this.ball_spd_y = 0.06;
            this.ball_size = 8;
        },
        loop: (std, game) => {
            const player_dir = std.math.dir(std.key.press.down - std.key.press.up);
            this.player_pos = std.math.clamp(this.player_pos + (player_dir * 7), 0, game.height - this.player_size);
            this.ball_pos_x += this.ball_spd_x * game.dt;
            this.ball_pos_y += this.ball_spd_y * game.dt;
    
            if (this.ball_pos_x >= (game.width - this.ball_size)) {
                this.ball_spd_x = -Math.abs(this.ball_spd_x);
            }
            if (this.ball_pos_y >= (game.height - this.ball_size)) {
                this.ball_spd_y = -Math.abs(this.ball_spd_y);
            }
            if (this.ball_pos_y <= 0) {
                this.ball_spd_y = Math.abs(this.ball_spd_y);
            }
            if (this.ball_pos_x <= 0) {
                if (std.math.clamp(this.ball_pos_y, this.player_pos, this.player_pos + this.player_size) === this.ball_pos_y) {
                    let new_spd_y = std.math.clamp(this.ball_spd_y + (this.player_pos % 10) - 5, -10, 10);
                    this.ball_spd_y = (this.ball_spd_y === 0 && new_spd_y === 0) ? 20 : new_spd_y;
                    this.ball_spd_y /= 16;
                    this.ball_spd_x = Math.abs(this.ball_spd_x) * 1.003;
                    this.score++;
                } else {
                    std.game.reset();
                }
            }
        },
        draw: (std, game) => {
            std.draw.clear(std.color.black);
            std.draw.color(std.color.white);
            std.draw.rect(0, 4, this.player_pos, 8, this.player_size);
            std.draw.rect(0, this.ball_pos_x, this.ball_pos_y, this.ball_size, this.ball_size);
            std.draw.font('Tiresias', 32);
            std.draw.text(game.width / 4, 16, this.ball_pos_y)//this.score);
            std.draw.text(game.width / 4 * 3, 16, this.highscore);
        },
        exit: (std, game) => {
            this.highscore = Math.max(this.highscore, this.score);
        }
    }
}
