window.Game = {
    meta: {
        title: "Ping Pong",
        version: "1.0.0",
        author: "Rodrigo Dornelles"
    },
    callbacks: {
        init: (std) => {
            this.score = 0;
            this.highscore = this.highscore == null ? 0 : this.highscore;
            this.player_size = std.app.height / 8;
            this.player_pos = std.app.height / 2 - this.player_size / 2;
            this.ball_pos_x = std.app.width / 2;
            this.ball_pos_y = std.app.height / 2;
            this.ball_spd_x = 0.3;
            this.ball_spd_y = 0.06;
            this.ball_size = 8
        },
        loop: (std) => {
            this.player_pos = std.math.clamp(this.player_pos + (std.key.axis.y * 7), 0, std.app.height - this.player_size);
            this.ball_pos_x += this.ball_spd_x * 32;
            this.ball_pos_y += this.ball_spd_y * 32;
    
            if (this.ball_pos_x >= (std.app.width - this.ball_size)) {
                this.ball_spd_x = -Math.abs(this.ball_spd_x);
            }
            if (this.ball_pos_y >= (std.app.height - this.ball_size)) {
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
                    std.app.reset();
                }
            }
        },
        draw: (std) => {
            std.draw.clear(std.color.black);
            std.draw.color(std.color.white);
            std.draw.rect(0, 4, this.player_pos, 8, this.player_size);
            std.draw.rect(0, this.ball_pos_x, this.ball_pos_y, this.ball_size, this.ball_size);
            std.text.put(20, 1, this.score);
            std.text.put(60, 1, this.highscore);
        },
        exit: (std) => {
            this.highscore = Math.max(this.highscore, this.score);
        }
    }
}
