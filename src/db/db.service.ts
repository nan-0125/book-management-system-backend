import { Inject, Injectable } from '@nestjs/common';
import { DbModuleOptions } from './db.module';
import { access, readFile, writeFile } from 'fs/promises';
import { Book } from 'src/book/entity/Book.entity';

@Injectable()
export class DbService<T> {
    @Inject('OPTIONS')
    private options: DbModuleOptions;

    async read(): Promise<T[]> {
        const filePath = this.options.path;

        try {
            await access(filePath);
            const str = await readFile(filePath, {
                encoding: 'utf-8'
            });
            
            if (!str) {
                return []
            }
            return JSON.parse(str);
        } catch (e) {
            return [];
        }

       
    }

    async write(obj: Record<string, any>) {
        try{
            await writeFile(this.options.path, JSON.stringify(obj || []), {
                encoding: 'utf-8'
            });
        } catch(e) {
            console.error(e)
        }
        
    }
}
