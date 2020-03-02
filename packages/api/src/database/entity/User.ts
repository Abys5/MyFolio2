import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeInsert,
    BaseEntity,
} from 'typeorm';
import BCrypt from 'bcrypt';
import { UserRole } from '../../UserRoles';

const BCRYPT_HASH_ROUND = 10;

@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column({ length: 500 })
    password: string;

    @Column({
        length: 1200,
    })
    image: string;

    @Column({ length: 1500 })
    description: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER,
    })
    roles: UserRole[];

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @BeforeInsert()
    beforeInsert(): void {
        this.password = BCrypt.hashSync(this.password, BCRYPT_HASH_ROUND);
    }
}
