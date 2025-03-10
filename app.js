// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Chat Panel Toggle
    const chatButton = document.getElementById('chat-button');
    const chatPanel = document.getElementById('chat-panel');
    const closeChat = document.getElementById('close-chat');
    const sendMessage = document.getElementById('send-message');
    const chatMessages = document.getElementById('chat-messages');

    if (chatButton && chatPanel && closeChat) {
        // Open chat panel
        chatButton.addEventListener('click', function() {
            chatPanel.classList.remove('hidden');
        });

        // Close chat panel
        closeChat.addEventListener('click', function() {
            chatPanel.classList.add('hidden');
        });

        // Send message functionality
        if (sendMessage) {
            sendMessage.addEventListener('click', function() {
                const input = document.querySelector('input[placeholder="Type your message..."]');
                if (input && input.value.trim() !== '') {
                    addMessage(input.value);
                    input.value = '';
                }
            });

            // Also allow sending with Enter key
            document.querySelector('input[placeholder="Type your message..."]')?.addEventListener('keypress', function(e) {
                if (e.key === 'Enter' && this.value.trim() !== '') {
                    addMessage(this.value);
                    this.value = '';
                }
            });
        }
    }

    // Function to add a new user message to the chat
    function addMessage(text) {
        if (!chatMessages) return;

        // Get current time
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
        const timeString = `${formattedHours}:${formattedMinutes} ${ampm}`;

        // Create user message
        const userMessageHTML = `
            <div class="flex mb-4 justify-end">
                <div class="bg-dental-blue rounded-lg p-3 max-w-xs text-white">
                    <p class="text-sm">${text}</p>
                    <p class="text-xs text-white text-opacity-75 mt-1">${timeString}</p>
                </div>
                <div class="flex-shrink-0 ml-3">
                    <div class="h-8 w-8 rounded-full bg-gray-300">
                        <img class="h-8 w-8 rounded-full object-cover" src="/api/placeholder/32/32" alt="User avatar">
                    </div>
                </div>
            </div>
        `;
        chatMessages.insertAdjacentHTML('beforeend', userMessageHTML);
        
        // Simulate AI response (after a short delay)
        setTimeout(() => {
            simulateAIResponse();
        }, 1000);

        // Scroll to bottom of chat
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Function to simulate an AI response
    function simulateAIResponse() {
        if (!chatMessages) return;

        // Get current time
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
        const timeString = `${formattedHours}:${formattedMinutes} ${ampm}`;

        // Sample responses
        const responses = [
            "I understand your question. Let me provide some guidance based on your practice's protocols.",
            "That's a great question about dental procedures. Here's what I recommend based on best practices.",
            "Based on your team's training data, I can see this is a common question. Here's how others in your practice handle this situation.",
            "I've analyzed similar scenarios in dental practices, and here's what tends to work well in this situation.",
            "Let me check your practice's custom protocols... Here's the recommended approach for this scenario.",
            "Looking at your learning progress, I think you might find this information helpful for addressing that issue."
        ];

        // Select a random response
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];

        // Create AI message
        const aiMessageHTML = `
            <div class="flex mb-4">
                <div class="flex-shrink-0 mr-3">
                    <div class="h-8 w-8 rounded-full bg-dental-light flex items-center justify-center">
                        <span class="text-dental-blue text-xs">🌿</span>
                    </div>
                </div>
                <div class="bg-gray-100 rounded-lg p-3 max-w-xs">
                    <p class="text-sm">${randomResponse}</p>
                    <p class="text-xs text-gray-500 mt-1">${timeString}</p>
                </div>
            </div>
        `;
        chatMessages.insertAdjacentHTML('beforeend', aiMessageHTML);

        // Scroll to bottom of chat
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const sidebar = document.querySelector('.sidebar');

    if (mobileMenuButton && sidebar) {
        mobileMenuButton.addEventListener('click', function() {
            sidebar.classList.toggle('hidden');
        });
    }

    // Modal functionality
    const modalTriggers = document.querySelectorAll('[data-modal-trigger]');
    const modalCloseButtons = document.querySelectorAll('.modal-close');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal-trigger');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.remove('hidden');
                // Prevent background scrolling
                document.body.style.overflow = 'hidden';
            }
        });
    });

    modalCloseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.classList.add('hidden');
                // Restore background scrolling
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Close modal when clicking outside the modal content
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    });

    // Learning Path Creation functionality (if on Learning Paths page)
    const createPathButton = document.getElementById('create-path-button');
    const pathCreationSuccess = document.getElementById('path-creation-success');

    if (createPathButton && pathCreationSuccess) {
        createPathButton.addEventListener('click', function() {
            // Simulate form submission and show success message
            pathCreationSuccess.classList.remove('hidden');
            setTimeout(() => {
                pathCreationSuccess.classList.add('hidden');
            }, 5000);
        });
    }

    // Knowledge Base Search functionality (if on Knowledge Base page)
    const searchKnowledgeBase = document.getElementById('search-knowledge-base');
    
    if (searchKnowledgeBase) {
        searchKnowledgeBase.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchTerm = document.getElementById('knowledge-search-input').value;
            if (searchTerm.trim() !== '') {
                // Simulate search results filtering
                filterKnowledgeBaseItems(searchTerm);
            }
        });
    }

    // Function to filter knowledge base items (simulated)
    function filterKnowledgeBaseItems(term) {
        const items = document.querySelectorAll('.knowledge-base-item');
        const lowerTerm = term.toLowerCase();
        
        items.forEach(item => {
            const title = item.querySelector('h4').textContent.toLowerCase();
            const description = item.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(lowerTerm) || description.includes(lowerTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    // Upgrade subscription page - plan selection
    const planCards = document.querySelectorAll('.plan-card');
    const upgradeButton = document.getElementById('upgrade-premium-btn');
    const checkoutModal = document.getElementById('checkout-success-modal');

    if (planCards.length > 0) {
        planCards.forEach(card => {
            card.addEventListener('click', function() {
                if (!this.id.includes('standard-plan')) {
                    planCards.forEach(c => c.classList.remove('selected'));
                    this.classList.add('selected');
                }
            });
        });
    }

    if (upgradeButton && checkoutModal) {
        upgradeButton.addEventListener('click', function() {
            // Simulate checkout process and show success modal
            checkoutModal.classList.remove('hidden');
        });
    }

    // Send invitation functionality (for admin console)
    const sendInviteButton = document.getElementById('send-invite');
    
    if (sendInviteButton) {
        sendInviteButton.addEventListener('click', function() {
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const roleSelect = document.getElementById('role');
            
            if (nameInput && emailInput && roleSelect &&
                nameInput.value.trim() !== '' && 
                emailInput.value.trim() !== '' && 
                roleSelect.value !== '') {
                
                // Close the modal and show a notification (could be enhanced)
                const modal = this.closest('.modal');
                if (modal) {
                    modal.classList.add('hidden');
                    document.body.style.overflow = 'auto';
                    
                    // Simple alert for demonstration
                    alert('Invitation sent successfully to ' + emailInput.value);
                    
                    // Reset form
                    nameInput.value = '';
                    emailInput.value = '';
                    roleSelect.selectedIndex = 0;
                }
            } else {
                alert('Please fill in all required fields');
            }
        });
    }
});