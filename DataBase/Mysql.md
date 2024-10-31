* [SQL查询语句的所有语法和函数](https://juejin.cn/book/7226988578700525605/section/7238472325102829629)
* mysql 也是分为 后台守护进程 和客户端 两个方面。
* Mysql workbench
* mysql -u root -p  password



* 每个数据库下存储着很多表、视图、存储过程和函数。
* 数据类型
    - int
    - varchar  VARCHAR(45) 数据类型表示可以存储最多45个字符的可变长度字符串
    - char
    - double
    - date
    - time
    - datetime
* primary key   unique not null


* 通过 sql 操作数据库。

```
drop table student

-- 创建数据库
CREATE DATABASE mydatabase;

-- 使用数据库
USE mydatabase;

-- 创建 student 表
CREATE TABLE student (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    age INT,
    gender CHAR(1),
    grade VARCHAR(20)
);

-- 插入单条记录
INSERT INTO student (name, age, gender, grade) VALUES ('Alice', 20, 'F', 'A');

-- 插入多条记录
INSERT INTO student (name, age, gender, grade) VALUES 
('Bob', 22, 'M', 'B'),
('Charlie', 21, 'M', 'A'),
('Diana', 19, 'F', 'C');

-- 查询所有记录
SELECT * FROM student;

-- 根据条件查询
SELECT * FROM student WHERE age > 21;

-- 查询特定字段
SELECT name, age FROM student;

-- 排序查询结果
SELECT * FROM student ORDER BY age DESC;

-- 分页查询
SELECT * FROM student LIMIT 10 OFFSET 5;


-- 更新单条记录
UPDATE student SET age = 21 WHERE name = 'Alice';

-- 更新多条记录
UPDATE student SET grade = 'A' WHERE age > 20;

-- 删除单条记录
DELETE FROM student WHERE name = 'Bob';

-- 删除多条记录
DELETE FROM student WHERE age < 20;

```

* 外键 联表查询

* 学生 班级  班级 老师
* 一对一 join 查询  级联方式
* 一对多 多对多关系的表设计

```
CREATE TABLE `hello-mysql`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT 'id',
  `name` VARCHAR(45) NOT NULL COMMENT '名字',
  PRIMARY KEY (`id`)
);

CREATE TABLE `id_card` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `card_name` varchar(45) NOT NULL COMMENT '身份证号',
  `user_id` int DEFAULT NULL COMMENT '用户 id',
  PRIMARY KEY (`id`),
  INDEX `card_id_idx` (`user_id`),  建立索引 索引名是 card_id_idex 这个是用于加速 user_id
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)  
)  CHARSET=utf8mb4

// CONSTRINT user_id FOREIGN KEY 是给 user_id 添加一个外键约束，然后 user_id REFERENCES user id 则是指定 user_id 引用这 user 表的 id 列。

// 关联查询

SELECT * FROM user JOIN id_card ON user.id = id_card.user_id

// INNER JOIN 是只返回两个表中能关联上的数据。

// CASCADE  
// SET NULL
// 

// 即使 MySQL 中没有定义外键，你仍然可以使用 JOIN 操作进行联表查询

CREATE TABLE student (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    course_id INT
);

CREATE TABLE course (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_name VARCHAR(50) NOT NULL
);

INSERT INTO student (name, course_id) VALUES ('Alice', 1);
INSERT INTO student (name, course_id) VALUES ('Bob', 2);
INSERT INTO student (name, course_id) VALUES ('Charlie', NULL);

INSERT INTO course (course_name) VALUES ('Math');
INSERT INTO course (course_name) VALUES ('Science');


SELECT student.name, course.course_name
FROM student
LEFT JOIN course ON student.course_id = course.id;

// 一对多关系是通过在多的一方添加外键来引用一的一方的 id。
// article tag  user role



CREATE TABLE `article` (
 `id` INT NOT NULL AUTO_INCREMENT,
 `title` VARCHAR(50) NOT NULL,
 `content` TEXT NOT NULL,
 PRIMARY KEY (`id`)
) CHARSET=utf8mb4;

CREATE TABLE `tag` (
 `id` INT NOT NULL AUTO_INCREMENT,
 `name` VARCHAR(50) NOT NULL,
 PRIMARY KEY (`id`)
);

CREATE TABLE `article_tag` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `article_id` INT NOT NULL,
    `tag_id` INT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`article_id`) REFERENCES `article`(`id`),
    FOREIGN KEY (`tag_id`) REFERENCES `tag`(`id`)
) CHARSET=utf8mb4;

SELECT a.id AS article_id, a.title, t.id AS tag_id, t.name AS tag_name
FROM `article` a, `tag` t
WHERE a.id = 1 AND t.id IN (1, 2); -- 手动指定关联关系


SELECT * FROM article a 
    JOIN article_tag at ON a.id = at.article_id
    JOIN tag t ON t.id = at.tag_id
    WHERE a.id = 1

article_tag at  article a   别名

```

* 事务和隔离级别
    - 事务内的几条要么全部成功 要么全部不成功，这样能保证数据的一致性。
    - START TRANSACTION
    - COMMIT  
    - ROLLBACK
    - 事务还没提交的数据，别的事务能不能读取到，这就涉及到隔离级别的概念了。

```

START TRANSACTION;

UPDATE order_items SET quantity=1 WHERE order_id=3;

UPDATE orders SET total_amount=200 WHERE id=3;

COMMIT;


```
