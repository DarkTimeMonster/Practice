using DaviskibaYP.Domain;

namespace DaviskibaYP.DAL
{
    public class ContactRepository
    {
        private static readonly List<ContactMessage> _messages = new();

        public void Save(ContactMessage message)
        {
            _messages.Add(message);
        }

        public IEnumerable<ContactMessage> GetAll()
        {
            return _messages;
        }
    }
}