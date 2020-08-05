const case1 = () => {
    const canvas = document.getElementById('canvas_1');
    const context = canvas.getContext('2d');

    context.strokeStyle = 'green';
    context.lineWidth = 5;

    context.rect(75, 75, 259, 250);
    context.stroke();
};

const case2 = () => {
    const canvas = document.getElementById('canvas_2');
    const context = canvas.getContext('2d');

    context.strokeStyle = 'green';
    context.fillStyle = 'brown';
    context.lineWidth = 5;

    context.rect(75, 50, canvas.width - 150, canvas.height - 100);
    context.stroke();
    context.fill();
};

const case3 = () => {
    const canvas = document.getElementById('canvas_3');
    const context = canvas.getContext('2d');

    context.strokeStyle = 'green';
    context.fillStyle = 'brown';
    context.lineWidth = 5;

    context.rect(75, 50, canvas.width - 150, canvas.height - 100);
    context.stroke();
    context.fill();

    context.font = '34px Arial';
    context.strokeStyle = 'black';
    context.fillStyle = 'gold';
    context.lineWidth = 0.75;
    context.textAlign = 'center';

    const textMessage = '2D Drawing';

    context.fillText(textMessage, canvas.width / 2, 100);
    context.strokeText(textMessage, canvas.width / 2, 100);
};

const case4 = () => {
    const canvas = document.getElementById('canvas_4');
    const context = canvas.getContext('2d');

    context.strokeStyle = 'green';
    context.fillStyle = 'brown';
    context.lineWidth = 5;

    context.rect(75, 50, canvas.width - 150, canvas.height - 100);
    context.stroke();
    context.fill();

    context.font = '34px Arial';
    context.strokeStyle = 'black';
    context.fillStyle = 'gold';
    context.lineWidth = 0.75;
    context.textAlign = 'center';

    const textMessage = '2D Drawing';

    context.fillText(textMessage, canvas.width / 2, 100);
    context.strokeText(textMessage, canvas.width / 2, 100);

    context.strokeStyle = 'grau';
    context.lineWidth = 2;

    context.beginPath();

    context.arc(200, 140, 20, 0, Math.PI * 2);

    context.moveTo(200, 160);
    context.lineTo(200, 220);

    context.moveTo(180, 300);
    context.lineTo(185, 260);
    context.lineTo(200, 220);
    context.lineTo(215, 260);
    context.lineTo(220, 300);

    context.moveTo(240, 130);
    context.lineTo(225, 170);
    context.lineTo(200, 170);
    context.lineTo(175, 180);
    context.lineTo(170, 220);

    context.stroke();
};

case1();
case2();
case3();
case4();

