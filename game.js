class SceneSelectCharacter extends Phaser.Scene {
    constructor() {
        super({ key: 'SceneSelectCharacter' });
    }

    preload() {
        this.load.image('boy', 'assets/boy.png');
        this.load.image('girl', 'assets/girl.png');
    }

    create() {
        this.add.text(300, 100, 'Escolha seu personagem:', { fontSize: '24px', fill: '#000' });

        let boy = this.add.sprite(300, 300, 'boy').setInteractive();
        let girl = this.add.sprite(500, 300, 'girl').setInteractive();

        boy.on('pointerdown', () => {
            this.scene.start('SceneMain', { character: 'boy' });
        });

        girl.on('pointerdown', () => {
            this.scene.start('SceneMain', { character: 'girl' });
        });
    }
}

class SceneMain extends Phaser.Scene {
    constructor() {
        super({ key: 'SceneMain' });
    }

    preload() {
        this.load.image('background', 'assets/background.png');
        this.load.image('boy', 'assets/boy.png');
        this.load.image('girl', 'assets/girl.png');
    }

    create(data) {
        this.add.image(400, 300, 'background');
        this.character = this.add.sprite(100, 300, data.character);
        this.add.text(50, 50, 'Bem-vindo à jornada!', { fontSize: '24px', fill: '#000' });

        this.pointsOfInterest = [
            { x: 200, y: 300, text: 'Ponto 1: O que é esquizofrenia?' },
            { x: 400, y: 300, text: 'Ponto 2: Sintomas' },
            { x: 600, y: 300, text: 'Ponto 3: Tratamento' }
        ];

        this.pointsOfInterest.forEach((point, index) => {
            let pointSprite = this.add.circle(point.x, point.y, 20, 0x6666ff).setInteractive();
            pointSprite.on('pointerdown', () => {
                this.showQuestion(index);
            });
        });
    }

    showQuestion(index) {
        let questions = [
            { question: 'O que é esquizofrenia?', options: ['Distúrbio mental', 'Doença física', 'Sintoma gripal'], answer: 0 },
            { question: 'Quais são os sintomas da esquizofrenia?', options: ['Febre', 'Alucinações', 'Tosse'], answer: 1 },
            { question: 'Qual é o tratamento?', options: ['Repouso', 'Dieta', 'Medicação e terapia'], answer: 2 }
        ];

        let currentQuestion = questions[index];
        this.add.text(50, 100, currentQuestion.question, { fontSize: '18px', fill: '#000' });

        currentQuestion.options.forEach((option, i) => {
            let optionText = this.add.text(50, 150 + (i * 30), option, { fontSize: '18px', fill: '#000' }).setInteractive();
            optionText.on('pointerdown', () => {
                if (i === currentQuestion.answer) {
                    alert('Correto!');
                    if (index < this.pointsOfInterest.length - 1) {
                        this.character.x = this.pointsOfInterest[index + 1].x - 100;
                    } else {
                        alert('Parabéns! Você completou a jornada!');
                    }
                } else {
                    alert('Errado. Tente novamente.');
                }
            });
        });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [SceneSelectCharacter, SceneMain],
    parent: 'game-container'
};

const game = new Phaser.Game(config);
