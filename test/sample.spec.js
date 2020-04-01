describe('test todoList', function () {
  let page;

  before(async function () {
    page = await browser.newPage();
    await page.goto('http://localhost:3000');
  });

  after(async function () {
    await page.close();
  });

  // 测试 add TODO
  it('should new todo correct', async function () {
    await page.click('#todo-input', {
      delay: 500
    });
    await page.type('#todo-input', 'new todo test', {
      delay: 50
    });
    await page.click('#add-todo');

    await page.$x('/html/body/div/ul');
    const result = await page.evaluate(() => {
      let elements = document.querySelectorAll('li');
      let str = elements[elements.length - 1].textContent;
      return str;
    });
    expect(result).to.include('new todo test');
  })

  // 测试 finish TODO
  it('should finish todo correct', async function () {
    await page.click('#unfinishtodo-2', {
      delay: 500
    });
    await page.$x('/html/body/div/ul/li[3]');
    const result = await page.evaluate(() => {
      let str = document.querySelector('li').textContent;
      return str;
    });
    expect(result).to.include('已完成');
  })

  // 测试 del TODO
  it('should del todo correct', async function () {
    let deltodotiem = await page.$eval('#todotiem-2', el => el.innerText);
    await page.click('#deltodo-2', {
      delay: 500
    });
    await page.$x('/html/body/div/ul');
    const result = await page.evaluate(() => {
      let elements = document.querySelectorAll('li');
      let str;
      for (var element of elements) {
        str = str + element.textContent;
      }
      return str;
    });
    expect(result).to.not.include(deltodotiem);
  })
});