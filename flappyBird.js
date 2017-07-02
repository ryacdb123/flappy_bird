var bird;
var pipes = [];

function setup(){
	createCanvas(400, 600);
	bird = new Bird();
	pipes.push(new Pipe());
}

function draw(){
	background(0);
	bird.update();
	bird.show();

	console.log(Pipe.totalHits);


	if(frameCount % 150 == 0){
		pipes.push(new Pipe());
	}

	for(var i = 0; i < pipes.length; i++){
		pipes[i].show();
		pipes[i].update();

		if(pipes[i].hits(bird)){
			console.log("hit");
		}

		if (pipes[i].x < -Pipe.w){
			pipes.splice(i, 1);
		}
	}


}

function keyPressed(){
	if(key === ' '){
		bird.up();
	}
}

function Bird(){
	this.y = height/2;
	this.x = 50;
	this.gravity = 0.1;
	this.velocity = 0;
	this.lift = -3;

	this.show = function(){
		fill(255);
		ellipse(this.x, this.y, 20, 20);
	}

	this.up = function(){
		this.velocity += this.lift;
	}

	this.update = function(){
		this.velocity += this.gravity
		this.y += this.velocity;

		if(this.y > height){
			this.y = height;
			velocity = 0;
		}
		if(this.y < 0){
			this.y = 0;
			velocity = 0;
		}
	}

}

function Pipe(){
	this.top = random(height/2);
	this.bottom = random(height/2);
	this.x = width;
	this.w=20;
	this.speed = 5;
	this.totalHits = 0;

	this.highlight = false;

	this.show = function(){
		fill(255);
		if(this.highlight){
			fill(255, 0, 0);
			this.highlight = false;
		}
		rect(this.x, 0, this.w, this.top);
		rect(this.x, height - this.bottom, this.w, this.bottom);
	}

	this.update = function(){
		this.x -= this.speed;
	}

	this.hits = function(bird){
		if(bird.y < this.top || bird.y> height - this.bottom && bird.x > this.x && bird.x < this.x + this.w){
			this.highlight = true;
			this.totalHits++;
			return true;
		}

		return false;
	}
}