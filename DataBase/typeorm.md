
```
import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "guang",
    database: "practice",
    synchronize: true,
    logging: true,
    entities: [User],
    migrations: [],
    subscribers: [],
    poolSize: 10,
    connectorPackage: 'mysql2',
    extra: {
        authPlugin: 'sha256_password',
    }
})


import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({
    name: 't_aaa'
})
export class Aaa {

    @PrimaryGeneratedColumn({
        comment: '这是 id'
    })
    id: number

    @Column({
        name: 'a_aa',
        type: 'text',
        comment: '这是 aaa'
    })
    aaa: string

    @Column({
        unique: true,
        nullable: false,
        length: 10,
        type: 'varchar',
        default: 'bbb'
    })
    bbb: string

    @Column({
        type: 'double',
    })
    ccc: number
}

// 一对一
// IdCard
@JoinColumn()
@OneToOne(()=> User)

const ics = await AppDataSource.manager.find(IdCard,{
    relations:{
        user:true
    }
})

// User

@OneToOne(()=> IdCard,(idCard)=> idCard.user)
idCard:IdCard
// 维持外键的那个表 就是 @JoinColumn 的那个 Entity 可以根据外键关联查询到另一方的。

// 没有外键 通过第二个参数告诉 typeorm，外键是另一个 Entity 的哪个属性。

const user = await AppDataSource.manager.find(User, {
    relations: {
        idCard: true
    }
});
console.log(user);


```
* type 是数据库的类型  TypeORM 不只支持 MySQL 还支持 postgres
* host port 指定数据库服务器的主机和端口号
* user password 是登录数据库的用户名和密码
* database 是要指定操作的 database 
* synchronize 是 根据同步建表,也就是当 database 里 没有和Entity对应的表的时候,会自动生成建表sql语句并执行
* entities 是指定有哪些和数据库的表对应的Entity
* AppDataSource.manager.getRepository(User).find()
* Entity里通过 @Entity指定和数据库表的映射,通过 @PrimaryGeneratedColumn  @Column

* @OneToOne
* @JoinColumn
* 一对多关系的映射，通过 @ManyToOne 或者 @OneToMany 装饰器。
* TypeORM 会自动在多的那一方添加外键，不需要通过 @JoinColumn 指定，不过你可以通过 @JoinColumn 来修改外键列的名字。
* 双方只能有一方 cascade，不然会无限循环。设置了 cascade 之后，只要一方保存，关联的另一方就会自动保存。
* @ManyToMany 和 @JoinTable 来声明的。
* 但如果双方都保留了对方的引用，需要第二个参数来指定关联的外键列在哪，也就是如何查找当前 entity。