using DaviskibaYP.Domain;
using DaviskibaYP.DAL;

namespace DaviskibaYP.Services
{
    public class ContactService
    {
        private readonly ContactRepository _repository;

        public ContactService()
        {
            _repository = new ContactRepository();
        }

        public void SubmitMessage(string name, string email, string message)
        {
            if (string.IsNullOrWhiteSpace(name) ||
                string.IsNullOrWhiteSpace(email) ||
                string.IsNullOrWhiteSpace(message))
                throw new ArgumentException("Все поля должны быть заполнены.");

            var contactMessage = new ContactMessage
            {
                Name = name,
                Email = email,
                Message = message
            };

            _repository.Save(contactMessage);
        }

        public IEnumerable<ContactMessage> GetAllMessages()
        {
            return _repository.GetAll();
        }
    }
}