using System.Threading.Tasks;

namespace ToDoList.API.Data
{
    public class GenericRepository : IGenericRepository
    {
        private readonly DataContext dataContext;

        public GenericRepository(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        public void Add<T>(T entity) where T : class
        {
            dataContext.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            dataContext.Remove(entity);
        }

        public async Task<bool> SaveAll()
        {
            return await dataContext.SaveChangesAsync() > 0;
        }
    }
}