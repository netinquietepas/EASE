var members = ['egoing', 'yechin.lee', 'ryomajk'];
console.log(members[1]);
//배열예제
var i = 0;
while (i<members.length) {
  console.log(members[i]);
  i++;
}


var roles = {
  'programmer': 'egoing',
  'designer' : 'yechin.lee',
  'manager' : 'ryomajk'
}

console.log(roles.designer);
console.log(roles['designer']);


for (var name in roles) {
  console.log('object :', name, 'value : ', roles[name]);
}

// 배열은 순서대로 들어가는 반면, 객체는 각 데이터마다 이름을 줘야함.
// 배열은 [], 객체는 {}
// 불러올때도 배열은 []안에 숫자 넣어서, 객체는 roles.designer


// for문의 첫자리에는 변수, in이라는 약속된 키워드를 작성 후, 반복적으로 처리하려는 객체를 그 뒤에 적어주기 .
